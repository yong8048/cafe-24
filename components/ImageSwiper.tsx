import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/styles/swiper.css";
import { loadingImage } from "@/utils/base64";

const ImageSwiper = ({ urls }: { urls: string[] }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    setCurrentIndex(1);
  }, [urls]);

  return (
    <>
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
          <SwiperSlide key={url.toString()} className="relative w-full h-full">
            {urls[0] === "/loading.gif" ? (
              <Image src={url.toString()} alt="로딩 이미지" width={200} height={200} className="m-auto" />
            ) : (
              <Image
                src={url.toString()}
                alt="카페 사진"
                fill
                sizes="(width: 435px, height: 220px)"
                onClick={() => {
                  setShowModal(true);
                }}
                className="object-cover cursor-pointer"
                placeholder={loadingImage}
              />
            )}
          </SwiperSlide>
        ))}
        <div className="absolute z-10 w-12 h-6 text-sm leading-6 text-center text-white bg-gray-800 rounded-lg right-2 bottom-2 opacity-70 ">
          <p>
            {currentIndex} / {urls.length}
          </p>
        </div>
      </Swiper>
      {showModal && (
        <div
          className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full overflow-auto bg-black bg-opacity-40"
          onClick={() => setShowModal(false)}
        >
          <div className="relative w-3/4 h-auto max-w-lg p-1 mx-auto rounded-md" onClick={e => e.stopPropagation()}>
            <Swiper
              modules={[Navigation]}
              slidesPerView={1}
              spaceBetween={100}
              scrollbar={{ draggable: true }}
              navigation
              pagination={{ clickable: true }}
              className="relative h-full"
              initialSlide={currentIndex - 1}
            >
              {urls.map(url => (
                <SwiperSlide key={url.toString()} className="relative">
                  <div className="w-full">
                    <Image src={url.toString()} alt="카페 사진" width={1000} height={600} placeholder={loadingImage} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageSwiper;
