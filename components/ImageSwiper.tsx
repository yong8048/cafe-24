import Image from "next/image";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/styles/swiper.css";

const ImageSwiper = ({ urls }: { urls: string[] }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      slidesPerView={1}
      scrollbar={{ draggable: true }}
      navigation
      pagination={{ clickable: true }}
      className="relative h-full"
    >
      {urls.map(url => (
        <SwiperSlide key={url.toString()} className="w-full h-full relative">
          {urls[0] === "/loading.gif" ? (
            <Image src={url.toString()} alt="로딩 이미지" width={200} height={200} className="m-auto" />
          ) : (
            <Image src={url.toString()} alt="카페 사진" layout="fill" objectFit="cover" />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSwiper;
