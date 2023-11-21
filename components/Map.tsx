import { useEffect } from "react";

const Map = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`;
    script.onload = () => initMap();
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 16,
    };
    const map = new window.naver.maps.Map("map", mapOptions);

    const marker = {
      position: new window.naver.maps.LatLng(37.3595704, 127.105399),
      map: map,
    };
    new window.naver.maps.Marker(marker);
  };

  return (
    <div>
      <div id="map" className="w-screen h-screen"></div>
    </div>
  );
};

export default Map;
