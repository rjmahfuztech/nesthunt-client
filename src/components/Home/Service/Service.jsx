import React from "react";
import ServiceCard from "./ServiceCard";
import { HelpCircle, HomeAlt, HomeSimple } from "iconoir-react";
import sectionImg from "../../../assets/images/sectionImage.png";
import serviceBackgroundImg from "../../../assets/images/serviceBackground.png";

const Service = () => {
  const services = [
    {
      icon: HomeSimple,
      title: "Advertise a House",
      description: "Advertisement your beautiful house for rent.",
    },
    {
      icon: HomeAlt,
      title: "Rent a House",
      description: "Advertisement your beautiful house for rent.",
    },
    {
      icon: HelpCircle,
      title: "Need Help?",
      description: "Advertisement your beautiful house for rent.",
    },
  ];
  return (
    <div
      className="bg-no-repeat bg-bottom py-20 bg-[#F9F9F9]"
      style={{ backgroundImage: `url(${serviceBackgroundImg})` }}
    >
      <div className="max-w-[1350px] mx-auto px-4 pb-10">
        <h2 className="text-3xl font-bold text-center uppercase">
          We have the service you need
        </h2>
        <div className="flex justify-center">
          <img src={sectionImg} alt="section image" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
