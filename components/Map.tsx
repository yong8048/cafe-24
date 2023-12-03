"use client";
import { useGetImages } from "@/hooks/useGetImages";
import { useImageStore } from "@/store/imageStore";
import { useSelectedStore } from "@/store/selectedStore";
import { useSidebarStore } from "@/store/sidebarStore";
import { IMarkerInfo } from "@/types/Map";
import { GetStoreInfo, GetStoreImages } from "@/utils/firebase";
import { useEffect, useRef, useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import "@/styles/marker.css";
import { useCafeTypeStore } from "@/store/cafeTypeStore";
import { useGetStores } from "@/hooks/useGetStores";
import { useUserInfoStore } from "@/store/userInfoStore";

const Map = () => {
  const mapRef = useRef<any | null>(null);
  const markerRef = useRef<IMarkerInfo[]>([]);
  const { setOpen } = useSidebarStore();
  const { setData } = useSelectedStore();
  const { setUrl, resetUrl } = useImageStore();
  const { type } = useCafeTypeStore();
  const [research, setResearch] = useState(false);
  const { stores, isError, isLoading } = useGetStores();
  const { userInfo } = useUserInfoStore();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`;
    script.onload = () => initMap();
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    setMarker();
  }, [type, isLoading]);

  const initMap = async () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(37.497952, 127.027619),
      zoom: 14,
    };

    if (mapRef.current === null) {
      mapRef.current = new window.naver.maps.Map("map", mapOptions);

      window.naver.maps.Event.addListener(mapRef.current, "dragend", () => {
        setResearch(true);
      });
    }
  };

  const setMarker = async () => {
    markerRef.current.map(marker => marker.setMap(null));

    if (stores) {
      let boundsStores = stores.filter(store => {
        return (
          store.latitude < mapRef.current.getBounds()._max._lat &&
          store.latitude > mapRef.current.getBounds()._min._lat &&
          store.longitude > mapRef.current.getBounds()._min._lng &&
          store.longitude < mapRef.current.getBounds()._max._lng
        );
      });

      if (type === "즐겨찾기") {
        boundsStores = boundsStores.filter(store => userInfo.fav.includes(store.id as string));
      } else if (type !== "전체") {
        boundsStores = boundsStores.filter(store => {
          return store.type === type;
        });
      }

      boundsStores.map(data => {
        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(data.latitude, data.longitude),
          map: mapRef.current,
          icon: {
            content: `
          <div class="marker-container">
          ${data.name}
          <div class="marker-arrow-border"></div>
          <div class="marker-arrow"></div>
          </div>`,
            size: new window.naver.maps.Size(128, 40),
            anchor: new window.naver.maps.Point(32, 32),
          },
          data: data,
        });
        markerRef.current.push(marker);
      });
      markerRef.current.map(marker => {
        window.naver.maps.Event.addListener(marker, "click", async () => {
          resetUrl();
          setData(marker.data);
          setOpen();
          const image = await GetStoreImages(marker.data.id as string);
          setUrl(image as string[]);
        });
      });

      setResearch(false);
    }
  };

  return (
    <div>
      <div
        id="map"
        className="w-screen h-main_section"
        onWheelCapture={() => {
          setResearch(true);
        }}
      ></div>
      {research && (
        <button
          onClick={setMarker}
          className="flex justify-center items-center gap-2 absolute w-48 h-7 top-28 left-1/2 transform -translate-x-1/2 z-20 bg-white text-l rounded-3xl border border-mainColor text-mainColor"
        >
          <IoMdRefresh />현 지도에서 검색
        </button>
      )}
    </div>
  );
};

export default Map;
