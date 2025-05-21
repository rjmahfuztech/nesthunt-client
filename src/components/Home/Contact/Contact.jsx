import React from "react";
import contactImg from "../../../assets/images/contact.jpeg";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import contactBg from "../../../assets/images/contactBg.jpeg";
import FadeIn from "../../Animation/FadeIn";

const Contact = () => {
  return (
    <div id="contact" className="py-20 md:py-32 relative">
      <div className="absolute inset-0">
        <img
          src={contactBg}
          alt="Background Image"
          className="object-cover object-center w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-10">
        <FadeIn y={-30} delay={0.1}>
          <h2 className="text-3xl font-bold text-center mb-4 uppercase text-white">
            Get in touch
          </h2>
          <hr className="bg-orange-400 h-1 border-none w-32 mx-auto mb-14 md:mb-20" />
        </FadeIn>
        <div className="px-4 flex flex-col md:flex-row gap-10 md:gap-20 justify-center items-center">
          <FadeIn x={-50} y={0} delay={0.2}>
            <img
              className="sm:w-[20rem] lg:w-[28rem] rounded-xl"
              src={contactImg}
              alt="Contact Image"
            />
          </FadeIn>
          <div className="xl:min-w-[35rem] mb-2">
            <FadeIn x={50} y={0} delay={0.3}>
              <form>
                <div className="flex gap-10">
                  {/* first name  */}
                  <div className="mb-2 md:mb-4 space-y-1.5 w-full">
                    <Typography
                      as="label"
                      htmlFor="first_name"
                      type="small"
                      className="font-semibold text-white"
                    >
                      First Name
                    </Typography>
                    <Input
                      required
                      className="w-full !placeholder-white text-white"
                      id="first_name"
                      color="success"
                      placeholder="first name"
                    />
                  </div>
                  {/* last name  */}
                  <div className="mb-2 md:mb-4 space-y-1.5 w-full">
                    <Typography
                      as="label"
                      htmlFor="last_name"
                      type="small"
                      className="font-semibold text-white"
                    >
                      Last Name
                    </Typography>
                    <Input
                      required
                      className="w-full !placeholder-white text-white"
                      id="last_name"
                      color="success"
                      placeholder="last name"
                    />
                  </div>
                </div>
                {/* email  */}
                <div className="mb-2 md:mb-4 space-y-1.5">
                  <Typography
                    as="label"
                    htmlFor="email"
                    type="small"
                    className="font-semibold text-white"
                  >
                    Email
                  </Typography>
                  <Input
                    required
                    className="w-full !placeholder-white text-white"
                    id="email"
                    type="email"
                    color="success"
                    placeholder="someone@example.com"
                  />
                </div>
                {/* Message  */}
                <div className="mb-2 md:mb-4 space-y-1.5">
                  <Typography
                    as="label"
                    htmlFor="message"
                    type="small"
                    className="font-semibold text-white"
                  >
                    Email
                  </Typography>
                  <Textarea
                    required
                    className="!placeholder-white text-white"
                    id="message"
                    color="success"
                    placeholder="Message here..."
                  />
                </div>
                <Button className="w-full bg-green-600 px-8 py-3 font-bold hover:bg-green-700 border-none">
                  Send Message
                </Button>
              </form>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
