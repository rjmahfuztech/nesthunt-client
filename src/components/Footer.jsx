import { Typography, IconButton } from "@material-tailwind/react";
import {
  Facebook,
  Instagram,
  X,
  Github,
  Dribbble,
  NavArrowUp,
  Linkedin,
  PhoneSolid,
  MailSolid,
  MapPin,
  NavArrowRight,
} from "iconoir-react";
import { Link, useLocation } from "react-router";
import defaultImg from "../assets/images/defaultImage.jpeg";
import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { format } from "date-fns";
import FadeIn from "./Animation/FadeIn";

const LINKS = [
  {
    title: "Useful Links",
    items: [
      { title: "About Us", to: "/#about" },
      { title: "Rentals", to: "/rentals" },
      { title: "Dashboard", to: "/dashboard" },
      { title: "Contact Us", to: "/#contact" },
    ],
  },
  {
    title: "Rent With Us",
    items: [
      { title: "Advertise a House", to: "/dashboard/advertisement/add" },
      { title: "My Advertisements", to: "/dashboard/my-advertisements" },
      { title: "Book Now", to: "/dashboard/rent-requests" },
      { title: "Favorite", to: "/dashboard/favorites" },
      { title: "Orders", to: "/dashboard/orders" },
    ],
  },
];

const YEAR = new Date().getFullYear();

const socialLinks = [
  { Icon: Facebook, href: "https://www.facebook.com/" },
  { Icon: Instagram, href: "https://www.instagram.com/" },
  { Icon: Dribbble, href: "https://dribbble.com/" },
  { Icon: Github, href: "https://github.com/" },
  { Icon: X, href: "https://x.com/" },
  { Icon: Linkedin, href: "https://www.linkedin.com/" },
];

const Footer = () => {
  const [recentPost, setRecentPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/advertisements/")
      .then((res) => {
        const sorted = res.data.results.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setRecentPost(sorted.slice(0, 2)); // get the latest 2 advertisement post
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  // smoothly scroll to sections
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ block: "start" });
        }, 0);
      }
    }
  }, [location]);

  return (
    <footer className="relative w-full bg-[#252525] py-20 text-white">
      <FadeIn y={20} duration={1} delay={0.1}>
        <div className="mx-auto w-full max-w-7xl px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-between gap-8">
            <div>
              <Typography type="h5" className="mb-6">
                Contact us
              </Typography>
              <div className="flex items-center gap-2 font-semibold">
                <PhoneSolid className="w-4 h-4" />{" "}
                <span>(+880) 1712376559</span>
              </div>
              <div className="flex items-center gap-2 font-semibold mt-4">
                <MailSolid className="w-4 h-4" />{" "}
                <span>support@nesthunt.com</span>
              </div>
              <div className="flex items-center gap-2 font-semibold mt-4">
                <MapPin className="w-4 h-4" />{" "}
                <span className="text-sm  text-zinc-400">
                  House 32, Road 11, Uttara, Dhaka 1230
                </span>
              </div>
            </div>
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <Typography type="h5" className="mb-6">
                  {title}
                </Typography>
                {items.map((navLink) => (
                  <li key={navLink.title} className="inline">
                    <Link
                      to={navLink.to}
                      className="py-1 text-sm text-zinc-400 hover:text-zinc-200 transition-colors duration-300 flex items-center gap-1"
                    >
                      <NavArrowRight strokeWidth={4} className="w-3 h-3" />{" "}
                      {navLink.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
            {/* Recent Post  */}
            <div>
              <Typography type="h5" className="mb-6">
                Recent Posts
              </Typography>
              {/* is loading  */}
              {loading && (
                <div className="ml-10">
                  <div className="loader"></div>
                </div>
              )}
              {recentPost.map((recent) => (
                <div key={recent.id} className="flex gap-4 mt-2">
                  <img
                    className="w-16 h-16 rounded-lg object-cover"
                    src={recent.images[0]?.image || defaultImg}
                    alt="House Image"
                  />
                  <div>
                    <h3 className="text-sm font-semibold">{recent.title}</h3>
                    <h3 className="text-xs text-zinc-400 mt-1">
                      {format(new Date(recent.created_at), "MMMM d, yyyy")}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-20 bg-[#303030] px-8 py-5 rounded-md flex w-full flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
            <Typography type="small" className="text-center">
              &copy; {YEAR} <span className="text-green-500">NestHunt</span>.
              All Rights Reserved.
            </Typography>
            <NavArrowUp
              onClick={() => window.scrollTo(0, 0)}
              strokeWidth={3}
              className="w-14 h-14 cursor-pointer text-blue-500 opacity-70 hover:opacity-90 transition-opacity duration-300"
            />
            {/* Social links  */}
            <div className="flex gap-4 sm:justify-center">
              {/* eslint-disable-next-line no-unused-vars */}
              {socialLinks.map(({ Icon, href }, index) => (
                <IconButton
                  key={index}
                  as="a"
                  target="_blank"
                  href={href}
                  variant="ghost"
                  size="sm"
                  className="text-white border-2 border-white hover:border-slate-300 hover:bg-green-700 rounded-full"
                >
                  <Icon strokeWidth={2} className="h-4 w-4" />
                </IconButton>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </footer>
  );
};

export default Footer;
