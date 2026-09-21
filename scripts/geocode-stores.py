#!/usr/bin/env python3
"""Geocode 만월경 store addresses for Firestore seed data."""

from __future__ import annotations

import json
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

RAW_PATH = Path("/tmp/manwolgyeong_raw.json")
OUT_PATH = Path("/workspace/data/seed/stores.json")
PROGRESS_PATH = Path("/tmp/geocode-progress.json")

USER_AGENT = "cafe-24-seed/1.0 (https://github.com/yong8048/cafe-24)"
ROAD_RE = re.compile(r"^(.*(?:로|길)\s*\d+(?:-\d+)?)")


def simplify(addr: str) -> str:
    match = ROAD_RE.search(addr)
    return match.group(1).strip() if match else addr.strip()


def fetch_json(url: str) -> object:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=20) as response:
        return json.loads(response.read().decode("utf-8"))


def geocode_photon(query: str) -> tuple[str, str] | None:
    encoded = urllib.parse.quote(query)
    data = fetch_json(f"https://photon.komoot.io/api/?q={encoded}&limit=1")
    features = data.get("features") or []
    if not features:
        return None
    lon, lat = features[0]["geometry"]["coordinates"]
    if lat is None or lon is None:
        return None
    return (str(lat), str(lon))


def geocode_nominatim(query: str) -> tuple[str, str] | None:
    encoded = urllib.parse.quote(query)
    data = fetch_json(
        "https://nominatim.openstreetmap.org/search"
        f"?format=jsonv2&limit=1&countrycodes=kr&accept-language=ko&q={encoded}"
    )
    if not data:
        return None
    return (str(data[0]["lat"]), str(data[0]["lon"]))


def load_progress() -> dict[str, dict]:
    if PROGRESS_PATH.exists():
        return json.loads(PROGRESS_PATH.read_text(encoding="utf-8"))
    return {}


def save_progress(progress: dict[str, dict]) -> None:
    PROGRESS_PATH.write_text(json.dumps(progress, ensure_ascii=False, indent=2), encoding="utf-8")


def main() -> None:
    stores = json.loads(RAW_PATH.read_text(encoding="utf-8"))
    progress = load_progress()
    today = time.strftime("%Y-%m-%d")

    for index, store in enumerate(stores, start=1):
        key = store["name"]
        if key in progress and progress[key].get("latitude"):
            continue
        query = simplify(store["address"])
        coords = None
        error = None
        try:
            coords = geocode_photon(query) or geocode_photon(f"{query} 대한민국")
            if not coords:
                time.sleep(1.0)
                coords = geocode_nominatim(query)
        except Exception as exc:  # noqa: BLE001 - keep going on individual failures
            error = str(exc)

        progress[key] = {
            **store,
            "query": query,
            "latitude": coords[0] if coords else "",
            "longitude": coords[1] if coords else "",
            "error": error,
        }
        if index % 10 == 0 or index == len(stores):
            save_progress(progress)
            found = sum(1 for item in progress.values() if item.get("latitude"))
            print(f"[{index}/{len(stores)}] geocoded={found}", flush=True)
        time.sleep(0.25)

    save_progress(progress)
    seeded = []
    for store in stores:
        item = progress.get(store["name"], store)
        if not item.get("latitude") or not item.get("longitude"):
            continue
        seeded.append(
            {
                "name": item["name"],
                "address": item["address"],
                "latitude": item["latitude"],
                "longitude": item["longitude"],
                "type": item.get("type", "무인"),
                "group": item.get("group", ""),
                "internet": item.get("internet", "가능"),
                "number": item.get("number", "1533-7025"),
                "parking": item.get("parking", ""),
                "table": item.get("table", ""),
                "toilet": item.get("toilet", "있음"),
                "date": today,
            }
        )

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(seeded, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {len(seeded)} stores to {OUT_PATH}")


if __name__ == "__main__":
    main()
