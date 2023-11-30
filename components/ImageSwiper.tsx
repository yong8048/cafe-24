import Image from "next/image";
import React, { useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/styles/swiper.css";

const ImageSwiper = ({ urls }: { urls: string[] }) => {
  const [showModal, setShowModal] = useState(false);
  const [clickImageUrl, setClickImageUrl] = useState("");

  const modalOpen = (imageUrl: string) => {
    setShowModal(true);
    setClickImageUrl(imageUrl);
  };

  const modalClose = () => {
    setShowModal(false);
  };

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
            <Image
              src={url.toString()}
              alt="카페 사진"
              layout="fill"
              objectFit="cover"
              onClick={() => {
                modalOpen(url.toString());
              }}
              className="cursor-pointer"
            />
          )}
        </SwiperSlide>
      ))}
      {showModal && (
        <div
          className="fixed z-50 left-0 top-0 w-full h-full overflow-auto bg-black bg-opacity-40 flex items-center justify-center"
          onClick={modalClose}
        >
          <div
            className="bg-gray-500 relative p-1 w-3/4 max-w-lg mx-auto rounded-md"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-full pointer-events-none ">
              <Image src={`${clickImageUrl}`} alt="모달 카페 사진" width={1000} height={600} />
            </div>
          </div>
        </div>
      )}
    </Swiper>
  );
};

export default ImageSwiper;
