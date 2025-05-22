import { Outlet } from "react-router";
import DashboardSidebar from "../components/Dashboard/DashboardSidebar";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar";
import { useEffect, useState } from "react";
import { IconButton, Drawer } from "@material-tailwind/react";
import { Xmark } from "iconoir-react";

const DashboardLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Track screen width to detect mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsDrawerOpen(false); // Tailwind's md breakpoint
    };

    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeDrawer = () => {
    if (isMobile) {
      setIsDrawerOpen(false);
    }
  };
  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      {!isMobile && (
        <div className="w-64 xl:w-72">
          <DashboardSidebar />
        </div>
      )}
      {isMobile && (
        <Drawer open={isDrawerOpen} onOpenChange={() => {}}>
          {/* Overlay only on mobile */}
          {isMobile && <Drawer.Overlay onClick={closeDrawer} />}
          <Drawer.Panel placement="left" className="p-0 w-64">
            <div className="flex items-center justify-between gap-4">
              <IconButton
                as={IconButton}
                size="sm"
                variant="ghost"
                color="secondary"
                className="absolute right-2 top-2"
                isCircular
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              >
                <Xmark className="h-7 w-7" />
              </IconButton>
            </div>
            {/* Dashboard Sidebar  */}
            <DashboardSidebar />
          </Drawer.Panel>
        </Drawer>
      )}
      {/* Dashboard Navbar  */}
      <div className="flex flex-col flex-1 overflow-auto">
        <DashboardNavbar
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
