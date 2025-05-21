import ServiceCard from "./ServiceCard";
import { HelpCircle, HomeAlt, HomeSimple } from "iconoir-react";
import sectionImg from "../../../assets/images/sectionImage.png";
import serviceBackgroundImg from "../../../assets/images/serviceBackground.png";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import FadeIn from "../../Animation/FadeIn";

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
  // animation variable
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.3, // stagger effect
        duration: 0.7,
        ease: "easeOut",
      },
    }),
  };
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
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.5, once: true }}
              variants={cardVariants}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
