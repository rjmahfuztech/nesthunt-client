import aboutImg from "../../../assets/images/aboutImg.jpeg";
import { HandCash, HeadsetHelp, ShieldCheck, UserLove } from "iconoir-react";
import OurAgents from "./OurAgents";
import FadeIn from "../../Animation/FadeIn";

const About = () => {
  const aboutData = [
    { icon: ShieldCheck, title: "Trusted" },
    { icon: HandCash, title: "Financing Easy" },
    { icon: HeadsetHelp, title: "24/7 support" },
    { icon: UserLove, title: "happy Clients" },
  ];
  return (
    <>
      <div id="about" className="bg-[#F0F2F4] py-10 md:py-32 px-4">
        <div className="max-w-[1350px] mx-auto">
          <FadeIn y={-30} delay={0.1}>
            <h2 className="text-3xl font-bold text-center mb-4 uppercase">
              About Us
            </h2>
            <hr className="bg-orange-400 h-1 border-none w-32 mx-auto mb-14 md:mb-20" />
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
            <FadeIn x={-50} y={0} delay={0.2}>
              <img
                className="w-[24rem] h-[24rem] md:w-[30rem] md:h-[30rem] object-cover object-center rounded-xl"
                src={aboutImg}
                alt="About Image"
              />
            </FadeIn>
            <div className="col-span-2">
              <FadeIn x={50} y={0} delay={0.3}>
                <h2 className="text-2xl md:text-4xl font-bold uppercase my-2">
                  Connecting You with Your Dream Home
                </h2>
                {/* History  */}
                <h4 className="text-lg font-bold">History:</h4>
                <p className="text-gray-500">
                  Homely is a modern real estate platform dedicated to providing
                  the best experience for renters and agents. Our history is
                  rooted in simplifying the home rental process, while
                  delivering exceptional service and expertise. We are committed
                  to using innovative technology to make rental transactions
                  faster, easier, and more transparent.
                </p>
                {/* History  */}
                <h4 className="text-lg font-bold">Mission:</h4>
                <p className="text-gray-500">
                  Homely is a modern real estate platform dedicated to providing
                  the best experience for renters and agents. Our mission is to
                  simplify the home rental process, while delivering exceptional
                  service and expertise. We are committed to using innovative
                  technology to make rental transactions faster, easier, and
                  more transparent.
                </p>
                {/* About company  */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-center mt-5">
                  {aboutData.map((about, index) => (
                    <div key={index}>
                      <about.icon
                        strokeWidth={1}
                        className="w-10 h-10 mx-auto mb-3"
                      />
                      <h4 className="font-semibold text-xl text-gray-500 text-center">
                        {about.title}
                      </h4>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
      {/* Our Real State Agents  */}
      <OurAgents />
    </>
  );
};

export default About;
