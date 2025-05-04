import { FacebookTag, Instagram, Linkedin, X } from "iconoir-react";
import profile1 from "../../../assets/images/profile/profile1.jpeg";
import profile2 from "../../../assets/images/profile/profile2.jpeg";
import profile3 from "../../../assets/images/profile/profile3.jpeg";
import profile4 from "../../../assets/images/profile/profile4.jpeg";

const OurAgents = () => {
  const ourAgents = [
    {
      profileImg: profile1,
      name: "Richard Johnson",
      title: "Real Estate Broker",
    },
    {
      profileImg: profile2,
      name: "Richard Johnson",
      title: "Real Estate Broker",
    },
    {
      profileImg: profile3,
      name: "Richard Johnson",
      title: "Real Estate Broker",
    },
    {
      profileImg: profile4,
      name: "Richard Johnson",
      title: "Real Estate Broker",
    },
  ];
  return (
    <div className="max-w-[1350px] mx-auto my-24 px-4">
      <h2 className="text-3xl font-bold text-center mb-4 uppercase">
        Meet Our Real Estate Agents
      </h2>
      <p className="text-gray-500 text-center mb-5">
        Meet our team of experienced and professional real estate agents <br />{" "}
        ready to help you with your property needs.
      </p>
      <hr className="bg-orange-400 h-1 border-none w-32 mx-auto mb-14" />
      {/* Agent profiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10">
        {ourAgents.map((agent, index) => (
          <div key={index} className="bg-[#F0F2F4] p-4 rounded-xl text-center">
            <div className="flex justify-center mb-2">
              <img
                className="rounded-full"
                src={agent.profileImg}
                alt="Profile Image"
              />
            </div>
            <h2 className="text-2xl font-semibold">{agent.name}</h2>
            <p className="text-gray-500 font-semibold">{agent.title}</p>
            <div className="mt-3 flex items-center justify-center gap-4">
              <FacebookTag
                strokeWidth={1.5}
                className="w-8 h-8 hover:text-green-400 transition-colors duration-200 cursor-pointer"
              />
              <Linkedin
                strokeWidth={1.5}
                className="w-8 h-8 hover:text-green-400 transition-colors duration-200 cursor-pointer"
              />
              <X
                strokeWidth={1.5}
                className="w-8 h-8 hover:text-green-400 transition-colors duration-200 cursor-pointer"
              />
              <Instagram
                strokeWidth={1.5}
                className="w-8 h-8 hover:text-green-400 transition-colors duration-200 cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurAgents;
