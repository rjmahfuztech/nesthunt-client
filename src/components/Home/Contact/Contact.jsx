import React from "react";
import contactImg from "../../../assets/images/contact.jpeg";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import contactBg from "../../../assets/images/contactBg.jpeg";

const Contact = () => {
  return (
    <div className="py-28 relative">
      <div className="absolute inset-0">
        <img
          src={contactBg}
          alt="Background Image"
          className="object-cover object-center w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-center mb-4 uppercase text-white">
          Get in touch
        </h2>
        <hr className="bg-orange-400 h-1 border-none w-32 mx-auto mb-14" />
        <div className="px-4 max-w-[1350px] mx-auto flex gap-20 justify-center items-center">
          <img
            className="max-w-[28rem] rounded-xl"
            src={contactImg}
            alt="Contact Image"
          />
          <div className="sm:min-w-2xl mb-2">
            <div className="flex gap-10">
              {/* first name  */}
              <div className="mb-4 space-y-1.5">
                <Typography
                  as="label"
                  htmlFor="first_name"
                  type="small"
                  color="default"
                  className="font-semibold"
                >
                  First Name
                </Typography>
                <Input
                  className="w-full"
                  id="first_name"
                  placeholder="first name"
                />
              </div>
              {/* last name  */}
              <div className="mb-4 space-y-1.5">
                <Typography
                  as="label"
                  htmlFor="last_name"
                  type="small"
                  color="default"
                  className="font-semibold"
                >
                  Last Name
                </Typography>
                <Input
                  className="w-full"
                  id="last_name"
                  placeholder="last name"
                />
              </div>
            </div>
            {/* email  */}
            <div className="mb-4 space-y-1.5">
              <Typography
                as="label"
                htmlFor="email"
                type="small"
                color="default"
                className="font-semibold"
              >
                Email
              </Typography>
              <Input
                className="w-full"
                id="email"
                type="email"
                placeholder="someone@example.com"
              />
            </div>
            {/* Message  */}
            <div className="mb-4 space-y-1.5">
              <Typography
                as="label"
                htmlFor="message"
                type="small"
                color="default"
                className="font-semibold"
              >
                Email
              </Typography>
              <Textarea id="message" placeholder="Message here..." />
            </div>
            <Button className="w-full" variant="outline">
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
