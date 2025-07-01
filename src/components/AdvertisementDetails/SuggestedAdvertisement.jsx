import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import AdvertisementInfo from "../Home/HomeAdvertisement/AdvertisementInfo";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import FadeIn from "../Animation/FadeIn";

const SuggestedAdvertisement = ({ advertiseId, categoryId }) => {
  const [advertisements, setAdvertisements] = useState([]);

  const customPagination = (_, className) => {
    return `<span class="${className} bg-gray-800 [&.swiper-pagination-bullet-active]:bg-gray-900 [&.swiper-pagination-bullet-active]:!opacity-100 !opacity-60"></span>`;
  };

  useEffect(() => {
    if (!categoryId) return;

    const fetchRelatedAdvertisement = async () => {
      try {
        const response = await apiClient.get(
          `/advertisements/?category_id=${categoryId}`
        );
        setAdvertisements(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRelatedAdvertisement();
  }, [categoryId]);

  const relatedAdvertisement = advertisements.filter(
    (data) => data.id !== parseInt(advertiseId)
  );

  return (
    <div className="my-8 md:my-14 border-t pt-8">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">
        Related Houses & Apartment:
      </h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
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
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {relatedAdvertisement.map((advertisement) => (
          <SwiperSlide key={advertisement.id}>
            <FadeIn delay={0.2}>
              <AdvertisementInfo advertisement={advertisement} />
            </FadeIn>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SuggestedAdvertisement;
