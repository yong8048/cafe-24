"use client";
import { useSelectedStore } from "@/store/selectedStore";
import { useSidebarStore } from "@/store/sidebarStore";
import { IMarkerInfo } from "@/types/Map";
import GetStoreInfo from "@/utils/firebase";
import { useEffect, useRef } from "react";

const Map = () => {
  const mapRef = useRef<any | null>(null);
  const markerRef = useRef<IMarkerInfo[]>([]);
  const { setOpen } = useSidebarStore();
  const { setData } = useSelectedStore();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`;
    script.onload = () => initMap();
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initMap = async () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 10,
    };

    if (mapRef.current === null) {
      mapRef.current = new window.naver.maps.Map("map", mapOptions);
    }

    setMarker();
  };

  const setMarker = async () => {
    markerRef.current.map(marker => marker.setMap(null));
    const storeInfo = await GetStoreInfo();

    const boundsStores = storeInfo.filter(store => {
      return (
        store.latitude < mapRef.current.getBounds()._max._lat && store.latitude > mapRef.current.getBounds()._min._lat
      );
    });
    boundsStores.map(data => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(data.latitude, data.longitude),
        map: mapRef.current,
        icon: {
          content: `
          <div style="
            white-space:nowrap; 
            position:relative; 
            background:white; 
            border-radius:25px; 
            margin-left:20px; 
            padding-left:10px; 
            padding-right:10px; 
            padding-top:5px; 
            padding-bottom:5px; 
            border: 1px solid #3b82f6; 
            font-weight:bold; 
            font-size: 12px">
              ${data.name}
              <div style="
                position: absolute;
                bottom: -11px;
                left: 9px;
                border-width: 11px 11px 0;
                border-style: solid;
                border-color: #3b82f6 transparent transparent transparent;
              "></div>
              <div style="
                position: absolute;
                bottom: -10px;
                left: 10px;
                border-width: 11px 10px 0;
                border-style: solid;
                border-color: white transparent transparent transparent;
              "></div>
            </div>`,
          size: new window.naver.maps.Size(128, 40),
          anchor: new window.naver.maps.Point(32, 32),
        },
        data: data,
      });
      markerRef.current.push(marker);
    });
    markerRef.current.map(marker => {
      window.naver.maps.Event.addListener(marker, "click", () => {
        setData(marker.data);
        setOpen();
      });
    });
  };

  return (
    <div>
      <div id="map" className="w-screen h-screen"></div>
      <button
        onClick={setMarker}
        className="absolute w-48 h-7 top-28 left-1/2 transform -translate-x-1/2 z-50 bg-white text-l rounded-3xl border border-mainColor text-mainColor"
      >
        현 지도에서 검색
      </button>
    </div>
  );
};

export default Map;
