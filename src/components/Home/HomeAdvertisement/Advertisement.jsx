import AdvertisementInfo from "./AdvertisementInfo";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import apiClient from "../../../services/apiClient";
import FadeIn from "../../Animation/FadeIn";

const Advertisement = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(false);

  const customPagination = (_, className) => {
    return `<span class="${className} bg-gray-800 [&.swiper-pagination-bullet-active]:bg-gray-900 [&.swiper-pagination-bullet-active]:!opacity-100 !opacity-60"></span>`;
  };

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/advertisements")
      .then((res) => setAdvertisements(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      id="advertisement"
      className="max-w-[1350px] mx-auto px-4 my-24 md:my-36"
    >
      <FadeIn y={-30} delay={0.1}>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 uppercase">
          Check out our house advertisements
        </h2>
        <hr className="bg-orange-400 h-1 border-none w-48 mx-auto mb-14 md:mb-20" />
      </FadeIn>
      <div className="mt-5">
        {loading && (
          <div className="flex h-80 md:h-96 items-center justify-center">
            <div className="loader"></div>
          </div>
        )}
        {!loading && advertisements.length === 0 && (
          <div className="flex h-80 md:h-96 items-center justify-center">
            <h1 className="text-xl md:text-3xl font-bold text-red-500">
              No Advertisement Found!!
            </h1>
          </div>
        )}
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
          {advertisements.map((advertisement) => (
            <SwiperSlide key={advertisement.id}>
              <FadeIn delay={0.2}>
                <AdvertisementInfo advertisement={advertisement} />
              </FadeIn>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Advertisement;
