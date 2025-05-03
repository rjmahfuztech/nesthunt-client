import React from "react";
import AdvertisementInfo from "./AdvertisementInfo";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import './styles.css';

// import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

const Advertisement = () => {
  const customPagination = (_, className) => {
    return `<span class="${className} bg-gray-800 [&.swiper-pagination-bullet-active]:bg-gray-900 [&.swiper-pagination-bullet-active]:!opacity-100 !opacity-60"></span>`;
  };

  return (
    <div className="max-w-[1350px] mx-auto px-4 my-20">
      <h2 className="text-3xl font-bold text-center mb-4 uppercase">
        Check out our house advertisements
      </h2>
      <hr className="bg-orange-400 h-1 border-none w-48 mx-auto mb-14" />
      <div className="mt-5">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          freeMode={true}
          pagination={{
            clickable: true,
            enabled: true,
            dynamicBullets: true,
            renderBullet: customPagination,
          }}
          breakpoints={{
            620: {
              slidesPerView: 2,
            },
            960: {
              slidesPerView: 3,
            },
          }}
          modules={[Autoplay, FreeMode, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <AdvertisementInfo />
          </SwiperSlide>
          <SwiperSlide>
            <AdvertisementInfo />
          </SwiperSlide>
          <SwiperSlide>
            <AdvertisementInfo />
          </SwiperSlide>
          <SwiperSlide>
            <AdvertisementInfo />
          </SwiperSlide>
          <SwiperSlide>
            <AdvertisementInfo />
          </SwiperSlide>
          <SwiperSlide>
            <AdvertisementInfo />
          </SwiperSlide>
          <SwiperSlide>
            <AdvertisementInfo />
          </SwiperSlide>
          <SwiperSlide>
            <AdvertisementInfo />
          </SwiperSlide>
          <SwiperSlide>
            <AdvertisementInfo />
          </SwiperSlide>
          <SwiperSlide>
            <AdvertisementInfo />
          </SwiperSlide>
          <SwiperSlide>
            <AdvertisementInfo />
          </SwiperSlide>
          <SwiperSlide>
            <AdvertisementInfo />
          </SwiperSlide>
          <SwiperSlide>
            <AdvertisementInfo />
          </SwiperSlide>
          <SwiperSlide>
            <AdvertisementInfo />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Advertisement;
