import { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import { NavArrowUp } from "iconoir-react";
import { Button } from "@material-tailwind/react";

const MainLayout = () => {
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrollDown = window.scrollY > 10;
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 10;

      if (isScrollDown && !isBottom) setIsScroll(true);
      else setIsScroll(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div>
      <NavigationBar />
      <Outlet />
      <Footer />
      {/* Scroll to top fixed button  */}
      <div
        className={`fixed right-5 z-10 transition-all duration-300 ease-in-out transform ${
          isScroll
            ? "bottom-8 opacity-100 translate-y-0"
            : "bottom-0 opacity-0 translate-y-5 pointer-events-none"
        } `}
      >
        <Button
          onClick={() => window.scrollTo(0, 0)}
          variant="ghost"
          className="text-green-500 bg-black rounded-full p-1 cursor-pointer hover:bg-gray-800"
        >
          <NavArrowUp strokeWidth={3} className="w-7 h-7 " />
        </Button>
      </div>
    </div>
  );
};

export default MainLayout;
