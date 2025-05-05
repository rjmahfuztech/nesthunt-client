import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import defaultImage from "../../assets/images/defaultImage.jpeg";

const AdvertisementImageGallery = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // Checking images availability
  const advertiseImages =
    images.length > 0 ? images : [{ id: 0, image: defaultImage }];

  return (
    <div className="bg-black rounded-xl md:rounded-2xl my-10">
      <Swiper
        spaceBetween={1}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-full max-h-[15rem] md:max-h-[40rem] xl:max-h-[45rem] rounded-xl md:rounded-2xl"
      >
        {advertiseImages.map((image) => (
          <SwiperSlide
            key={image.id}
            className="text-center flex justify-center items-center"
          >
            <img
              className="w-full object-cover object-center"
              src={image.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        navigation={true}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper w-full h-[4rem] md:h-[7rem] box-border !p-2 rounded-xl md:rounded-2xl"
      >
        {advertiseImages.map((image) => (
          <SwiperSlide className="text-center  flex justify-center items-center opacity-40">
            <img
              key={image.id}
              className="block w-full h-full object-cover rounded-md md:rounded-xl"
              src={image.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AdvertisementImageGallery;
