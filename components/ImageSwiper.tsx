import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/styles/swiper.css";

const ImageSwiper = ({ urls }: { urls: string[] }) => {
  const [showModal, setShowModal] = useState(false);
  const [clickImageUrl, setClickImageUrl] = useState("");
  const [currentIndex, setCurrentIndex] = useState(1);

  const modalOpen = (imageUrl: string) => {
    setShowModal(true);
    setClickImageUrl(imageUrl);
  };

  const modalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setCurrentIndex(1);
  }, [urls]);

  return (
    <Swiper
      modules={[Navigation]}
      slidesPerView={1}
      scrollbar={{ draggable: true }}
      navigation
      pagination={{ clickable: true }}
      className="relative h-full"
      onSlideNextTransitionStart={() => setCurrentIndex(currentIndex + 1)}
      onSlidePrevTransitionStart={() => setCurrentIndex(currentIndex - 1)}
    >
      {urls.map(url => (
        <SwiperSlide key={url.toString()} className="w-full h-full relative">
          {urls[0] === "/loading.gif" ? (
            <Image src={url.toString()} alt="로딩 이미지" width={200} height={200} className="m-auto" />
          ) : (
            <Image
              src={url.toString()}
              alt="카페 사진"
              fill
              sizes="(width: 435px, height: 220px)"
              onClick={() => {
                modalOpen(url.toString());
              }}
              className="cursor-pointer object-cover"
            />
          )}
        </SwiperSlide>
      ))}
      <div className="absolute right-2 bottom-2 w-12 h-6 rounded-lg bg-gray-800 z-10 opacity-70 text-white leading-6 text-center text-sm ">
        <p>
          {currentIndex} / {urls.length}
        </p>
      </div>
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
              <Image src={clickImageUrl} alt="모달 카페 사진" width={1000} height={600} />
            </div>
          </div>
        </div>
      )}
    </Swiper>
  );
};

export default ImageSwiper;
