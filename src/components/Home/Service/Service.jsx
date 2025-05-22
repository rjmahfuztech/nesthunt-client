import ServiceCard from "./ServiceCard";
import { HelpCircle, HomeAlt, HomeSimple } from "iconoir-react";
import sectionImg from "../../../assets/images/sectionImage.png";
import serviceBackgroundImg from "../../../assets/images/serviceBackground.png";
import FadeIn from "../../Animation/FadeIn";
import StaggerFadeIn from "../../Animation/StaggerFadeIn";

const Service = () => {
  const services = [
    {
      icon: HomeSimple,
      title: "Advertise a House",
      description: "Advertisement your beautiful house for rent.",
      to: "/dashboard/advertisement/add",
    },
    {
      icon: HomeAlt,
      title: "Rent a House",
      description: "Rent your favorite house from out website.",
      to: "/rentals",
    },
    {
      icon: HelpCircle,
      title: "Need Help?",
      description: "If you need any help, Just click here.",
      to: "#contact",
    },
  ];

  return (
    <div
      id="service"
      className="bg-no-repeat bg-bottom pt-36 pb-28 bg-[#F9F9F9]"
      style={{ backgroundImage: `url(${serviceBackgroundImg})` }}
    >
      <div className="max-w-[1350px] mx-auto px-4 pb-10">
        <FadeIn y={-30} delay={0.1}>
          <h2 className="text-3xl font-bold text-center uppercase">
            We have the service you need
          </h2>
          <div className="flex justify-center mb-10 md:mb-16">
            <img src={sectionImg} alt="section image" />
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
          {services.map((service, index) => (
            <FadeIn key={index} scale={0.8} delay={0.2 * index} y={50}>
              <ServiceCard service={service} />
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
