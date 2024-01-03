"use client";
import { useImageStore } from "@/store/imageStore";
import { useSelectedStore } from "@/store/selectedStore";
import { useSidebarStore } from "@/store/sidebarStore";
import { IMarkerInfo, IMarkerOptions } from "@/types/Map";
import { GetStoreImages } from "@/utils/firebase";
import { useEffect, useRef, useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { TbCurrentLocation } from "react-icons/tb";
import { useCafeTypeStore } from "@/store/cafeTypeStore";
import { useGetStores } from "@/hooks/useGetStores";
import { useUserInfoStore } from "@/store/userInfoStore";
import { CgClose as Close } from "react-icons/cg";
import { useReportClickStore } from "@/store/ReportClickStore";
import { useReportLocationStore } from "@/store/reportLocationStore";
import "@/styles/marker.css";

const Map = () => {
  const [myLocation, setMyLocation] = useState<{ latitude: number; longitude: number }>();
  const [research, setResearch] = useState(false);
  const [isHoverCurrentLocation, setIsHoverCurrentLocation] = useState(false);
  const [mapZoom, setMapZoom] = useState(14);
  const mapRef = useRef<any | null>(null);
  const markerRef = useRef<IMarkerInfo[]>([]);
  const clickMarkerRef = useRef<any>(null);
  const currentMarker = useRef<any>(null);
  const { setOpen } = useSidebarStore();
  const { setData } = useSelectedStore();
  const { setUrl, resetUrl } = useImageStore();
  const { type } = useCafeTypeStore();
  const { userInfo } = useUserInfoStore();
  const { isReportClicked, setIsReportClicked } = useReportClickStore();
  const { setLocation, resetLocation } = useReportLocationStore();
  const { stores, isLoading } = useGetStores();

  useEffect(() => {
    setCurrentLocation();

    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`;
    script.onload = () => initMap();
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    setResearch(false);
    markerRef.current.map(marker => marker.setVisible(!isReportClicked));

    if (mapRef.current !== null) {
      const dragendListener = window.naver.maps.Event.addListener(mapRef.current, "dragend", () => {
        !isReportClicked && setResearch(true);
      });

      if (clickMarkerRef.current === null) {
        const clickMarker = new window.naver.maps.Marker({
          position: mapRef.current.getCenter(),
          map: mapRef.current,
          visible: false,
        });
        clickMarkerRef.current = clickMarker;
      } else {
        clickMarkerRef.current.setVisible(false);
      }

      const clickListener = window.naver.maps.Event.addListener(mapRef.current, "click", (e: any) => {
        if (isReportClicked) {
          clickMarkerRef.current.setVisible(true);
          clickMarkerRef.current.setPosition(e.coord);
          setLocation({ latitude: e.coord._lat, longitude: e.coord._lng });
        }
      });

      const zoomChangedListener = window.naver.maps.Event.addListener(mapRef.current, "zoom_changed", () => {
        setMapZoom(getMapZoom());
      });

      return () => {
        window.naver.maps.Event.removeListener(dragendListener);
        window.naver.maps.Event.removeListener(clickListener);
        window.naver.maps.Event.removeListener(zoomChangedListener);
      };
    }
  }, [mapRef.current, isReportClicked]);

  useEffect(() => {
    setMarker();
  }, [type, isLoading, mapZoom]);

  const initMap = async () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(37.497952, 127.027619),
      mapDataControl: false,
      scaleControl: false,
      mapTypeControl: false,
      zoom: 14,
    };

    if (mapRef.current === null) {
      mapRef.current = new window.naver.maps.Map("map", mapOptions);
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
        const markerOptions: IMarkerOptions = {
          position: new window.naver.maps.LatLng(data.latitude, data.longitude),
          map: mapRef.current,
          data: data,
        };

        if (getMapZoom() > 12) {
          markerOptions.icon = {
            content: `
              <div class="marker-container">
                ${data.name}
                <div class="marker-arrow-border"></div>
                <div class="marker-arrow"></div>
              </div>`,
            size: new window.naver.maps.Size(110, 41),
            anchor: new window.naver.maps.Point(20, 41),
          };
        }

        const marker = new window.naver.maps.Marker(markerOptions);

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

  const setCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setMyLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        error => {
          setMyLocation({ latitude: 37.497952, longitude: 127.027619 });
          console.error(error);
        },
      );
    }
  };

  const handleCurrentClick = () => {
    currentMarker.current?.setMap(null);
    setCurrentLocation();
    const _myLocation = new window.naver.maps.LatLng(myLocation?.latitude, myLocation?.longitude);
    mapRef.current.panTo(_myLocation);
    currentMarker.current = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(myLocation?.latitude, myLocation?.longitude),
      map: mapRef.current,
      icon: {
        content: `<div class="mobile-current-marker-border"></div>`,
        size: new window.naver.maps.Size(15, 15),
        anchor: new window.naver.maps.Point(7, 7),
      },
    });

    setIsHoverCurrentLocation(false);
  };

  const getMapZoom = () => {
    return mapRef.current && mapRef.current.getZoom();
  };

  return (
    <div className={`${isReportClicked && "bg-black opacity-80"}`}>
      <div id="map" className="w-full sm:h-main_section_sm h-main_section mobile_height"></div>
      <div
        className={`${
          isReportClicked ? "bottom-5" : "bottom-20"
        } flex justify-center items-center w-9 h-9 absolute sm:right-5 right-1 bg-white rounded-md shadow-currentLocation border border-[rgba(0,0,0,0.2)] `}
      >
        <button
          className="relative"
          onMouseOver={() => setIsHoverCurrentLocation(true)}
          onMouseLeave={() => setIsHoverCurrentLocation(false)}
          onClick={handleCurrentClick}
        >
          <TbCurrentLocation size="20" />
          <span
            className={`${
              isHoverCurrentLocation ? "opacity-100" : "opacity-0"
            } absolute -left-24 top-1/2 -translate-y-1/2 w-20 duration-300 bg-black rounded-full text-white text-sm py-1`}
          >
            접속위치
          </span>
        </button>
      </div>
      {research && (
        <button
          onClick={setMarker}
          className="absolute z-20 flex items-center justify-center w-48 gap-2 text-lg transform -translate-x-1/2 bg-white border sm:top-28 h-7 top-14 left-1/2 rounded-3xl border-mainColor text-mainColor"
        >
          <IoMdRefresh />현 지도에서 검색
        </button>
      )}
      {isReportClicked && (
        <>
          <button
            className="absolute sm:top-28 sm:right-10 top-[52px] right-2"
            onClick={() => {
              setIsReportClicked();
              clickMarkerRef.current.setVisible(false);
              resetLocation();
            }}
          >
            <Close size="40" />
          </button>
          <div className="sm:top-[120px] text-center absolute sm:w-72 w-52 py-1.5 px-1.5 font-[500] top-14 left-1/2 transform -translate-x-1/2 bg-white sm:text-lg text-sm rounded-md border border-mainColor">
            <h1>매장위치를 지도에서 클릭해주세요</h1>
          </div>
        </>
      )}
    </div>
  );
};

export default Map;
