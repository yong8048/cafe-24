#!/usr/bin/env python3
"""Fetch 만월경 / 커피에반하다 store lists and write local JSON (no PII, no image files)."""

from __future__ import annotations

import json
import re
import time
import urllib.parse
import urllib.request
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = ROOT / "data" / "raw"
LOCAL_DIR = ROOT / "data" / "local"
EXISTING_SEED = ROOT / "data" / "seed" / "stores.json"

USER_AGENT = "cafe-24-local-fetch/1.0 (https://github.com/yong8048/cafe-24)"
ROAD_RE = re.compile(r"^(.*(?:로|길)\s*\d+(?:-\d+)?)")

CAFEWHALE_URL = "https://www.cafewhale.com/bbs/content.php?co_id=store"
BANHADA_URL = "https://coffeebanhada.com/main/store/find.php"

BANHADA_TYPE = {
    "1": "일반",
    "2": "무인",
    "6": "무인",
    "1,6": "무인",
    "2,6": "무인",
}


def fetch_text(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=60) as response:
        return response.read().decode("utf-8", "replace")


def fetch_json(url: str):
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=20) as response:
        return json.loads(response.read().decode("utf-8"))


def simplify(addr: str) -> str:
    match = ROAD_RE.search(addr)
    return match.group(1).strip() if match else addr.strip()


def geocode_photon(query: str) -> tuple[str, str] | None:
    encoded = urllib.parse.quote(query)
    data = fetch_json(f"https://photon.komoot.io/api/?q={encoded}&limit=1")
    features = data.get("features") or []
    if not features:
        return None
    lon, lat = features[0]["geometry"]["coordinates"]
    if lat is None or lon is None:
        return None
    return str(lat), str(lon)


def grab(block: str, attr: str) -> str:
    match = re.search(rf'data-{attr}="([^"]*)"', block)
    return match.group(1).strip() if match else ""


def region_of(address: str) -> str:
    addr = address.strip()
    if addr.startswith("서울") or addr.startswith("서울특별시"):
        return "서울"
    seoul_gu = (
        "강남",
        "강동",
        "강북",
        "강서",
        "관악",
        "광진",
        "구로",
        "금천",
        "노원",
        "도봉",
        "동대문",
        "동작",
        "마포",
        "서대문",
        "서초",
        "성동",
        "성북",
        "송파",
        "양천",
        "영등포",
        "용산",
        "은평",
        "종로",
        "중구",
        "중랑",
    )
    if any(addr.startswith(gu) or addr.startswith(f"{gu}구") for gu in seoul_gu):
        return "서울"
    if addr.startswith("인천"):
        return "인천"
    if addr.startswith("경기") or addr.startswith("김포"):
        return "경기"
    gyeonggi_cities = (
        "수원",
        "성남",
        "용인",
        "고양",
        "화성",
        "부천",
        "남양주",
        "안산",
        "안양",
        "평택",
        "시흥",
        "파주",
        "의정부",
        "김포",
        "광명",
        "광주",
        "군포",
        "하남",
        "오산",
        "양주",
        "이천",
        "구리",
        "안성",
        "포천",
        "의왕",
        "양평",
        "여주",
        "동두천",
        "과천",
        "가평",
        "연천",
    )
    if any(addr.startswith(city) for city in gyeonggi_cities):
        return "경기"
    return "기타"


def parse_cafewhale(html: str) -> list[dict]:
    stores = []
    seen = set()
    for part in html.split('class="con17_mid_map_search_item store')[1:]:
        block = part[:3000]
        name = grab(block, "name")
        address = grab(block, "address")
        key = (name, address)
        if not name or not address or key in seen:
            continue
        seen.add(key)
        tel = grab(block, "tel")
        stores.append(
            {
                "source": "cafewhale",
                "brand": "만월경",
                "sourceId": name,
                "name": name,
                "address": address,
                "number": "" if tel in ("", "-") else tel,
                "photo": grab(block, "photo"),
                "naver": grab(block, "naver"),
                "region": region_of(address),
                "typeRaw": "무인",
            }
        )
    return stores


def parse_banhada(html: str) -> list[dict]:
    match = re.search(r"ar_store\.push\((\[.*?\])\);", html, re.S)
    if not match:
        raise RuntimeError("커피에반하다 ar_store JSON을 찾지 못했습니다.")
    rows = json.loads(match.group(1))
    stores = []
    for row in rows:
        address = (row.get("s_addr2") or row.get("s_addr1") or "").strip()
        name = (row.get("s_name") or "").strip()
        if not name or not address:
            continue
        type_raw = str(row.get("s_type") or "1")
        photos = [row.get(f"s_img{i}") for i in range(1, 11) if row.get(f"s_img{i}")]
        parking_raw = str(row.get("s_parking") or "").strip()
        parking = ""
        if parking_raw in ("유", "가능"):
            parking = "가능"
        elif parking_raw in ("무", "불가"):
            parking = "불가"
        stores.append(
            {
                "source": "coffeebanhada",
                "brand": "커피에반하다",
                "sourceId": str(row.get("s_idx") or name),
                "name": name,
                "address": address,
                "addressJibun": (row.get("s_addr1") or "").strip(),
                "number": (row.get("s_tel") or "").strip(),
                "latitude": str(row.get("s_lat") or "").strip(),
                "longitude": str(row.get("s_long") or "").strip(),
                "photos": photos,
                "hours": (row.get("s_time") or "").replace("<br>", " ").strip(),
                "parkingRaw": parking_raw,
                "parking": parking,
                "region": region_of(address),
                "typeRaw": type_raw,
            }
        )
    return stores


def to_store_info(item: dict, today: str) -> dict:
    brand = item["brand"]
    mapped_type = BANHADA_TYPE.get(item.get("typeRaw", ""), item.get("typeRaw") or "무인")
    display_name = item["name"] if item["name"].startswith(brand) else f"{brand} {item['name']}"
    return {
        "id": f"{item['source']}-{item['sourceId']}",
        "name": display_name,
        "address": item["address"],
        "latitude": item.get("latitude") or "",
        "longitude": item.get("longitude") or "",
        "number": item.get("number") or "",
        "type": mapped_type,
        "group": "",
        "internet": "가능" if brand == "만월경" else "",
        "parking": item.get("parking") or "",
        "table": "",
        "toilet": "있음" if brand == "만월경" else "",
        "date": today,
        "brand": brand,
        "source": item["source"],
        "region": item.get("region") or "",
        "hours": item.get("hours") or "",
        "naver": item.get("naver") or "",
        "photo": item.get("photo") or "",
        "photos": item.get("photos") or [],
        "typeRaw": item.get("typeRaw") or "",
    }


def load_existing_coords() -> dict[str, tuple[str, str]]:
    if not EXISTING_SEED.exists():
        return {}
    coords = {}
    for store in json.loads(EXISTING_SEED.read_text(encoding="utf-8")):
        name = store.get("name", "").replace("만월경 ", "")
        if store.get("latitude") and store.get("longitude"):
            coords[name] = (store["latitude"], store["longitude"])
            coords[store.get("address", "")] = (store["latitude"], store["longitude"])
    return coords


def fill_cafewhale_coords(stores: list[dict]) -> None:
    existing = load_existing_coords()
    missing = 0
    geocoded = 0
    for store in stores:
        latlon = existing.get(store["name"]) or existing.get(store["address"])
        if latlon:
            store["latitude"], store["longitude"] = latlon
            continue
        missing += 1
        query = simplify(store["address"])
        coords = None
        try:
            coords = geocode_photon(query) or geocode_photon(f"{query} 대한민국")
        except Exception:
            coords = None
        if coords:
            store["latitude"], store["longitude"] = coords
            geocoded += 1
        else:
            store["latitude"] = store.get("latitude") or ""
            store["longitude"] = store.get("longitude") or ""
        time.sleep(0.25)
    print(f"만월경 신규 지오코딩 시도 {missing}곳, 성공 {geocoded}곳")


def write_json(path: Path, data) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    today = date.today().isoformat()
    print("만월경 페이지 받는 중...")
    cafewhale_html = fetch_text(CAFEWHALE_URL)
    print("커피에반하다 페이지 받는 중...")
    banhada_html = fetch_text(BANHADA_URL)

    cafewhale = parse_cafewhale(cafewhale_html)
    banhada = parse_banhada(banhada_html)
    print(f"만월경 {len(cafewhale)}곳, 커피에반하다 {len(banhada)}곳")

    fill_cafewhale_coords(cafewhale)

    write_json(RAW_DIR / "cafewhale-stores.json", cafewhale)
    write_json(RAW_DIR / "coffeebanhada-stores.json", banhada)

    combined = [to_store_info(item, today) for item in cafewhale + banhada]
    seoul_gg = [item for item in combined if item["region"] in ("서울", "경기")]
    seoul_gg_unmanned = [item for item in seoul_gg if item["type"] == "무인"]
    with_coords = [item for item in combined if item["latitude"] and item["longitude"]]

    write_json(LOCAL_DIR / "stores.json", combined)
    write_json(LOCAL_DIR / "stores-seoul-gyeonggi.json", seoul_gg)
    write_json(LOCAL_DIR / "stores-seoul-gyeonggi-unmanned.json", seoul_gg_unmanned)
    write_json(
        LOCAL_DIR / "summary.json",
        {
            "fetchedAt": today,
            "cafewhale": len(cafewhale),
            "coffeebanhada": len(banhada),
            "combined": len(combined),
            "withCoords": len(with_coords),
            "seoulGyeonggi": len(seoul_gg),
            "seoulGyeonggiUnmanned": len(seoul_gg_unmanned),
        },
    )
    print(json.dumps(json.loads((LOCAL_DIR / "summary.json").read_text()), ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
