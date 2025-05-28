import { useEffect, useState } from "react";
import Statistics from "../components/Dashboard/Statistics";
import {
  Calendar,
  CalendarMinus,
  Clock,
  Group,
  Megaphone,
} from "iconoir-react";
import authApiClient from "../services/authApiClient";
import BarChart from "../components/Dashboard/Charts/BarChart";
import CategoryDonutChart from "../components/Dashboard/Charts/CategoryDonutChart";

const Dashboard = () => {
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    authApiClient
      .get("/admin/dashboard/")
      .then((res) => setStatistics(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const statInfo = [
    { icon: Group, title: "Total Users", count: statistics.total_users },
    {
      icon: Megaphone,
      title: "Total Advertisements",
      count: statistics.total_advertisement,
    },
    {
      icon: Clock,
      title: "Total Pending Advertisements",
      count: statistics.total_pending_advertisement,
    },
    {
      icon: Calendar,
      title: "Current Month Advertisements",
      count: statistics.current_month_advertisement,
    },
    {
      icon: CalendarMinus,
      title: "Last Month Advertisements",
      count: statistics.last_month_advertisement,
    },
  ];

  if (loading)
    return (
      <div className="flex justify-center h-80 items-center">
        <div className="loader"></div>
      </div>
    );

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-4">
        {statInfo.map((stat, index) => (
          <Statistics key={index} stat={stat} />
        ))}
      </div>
      <div className="mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4">
          <div className="col-span-2">
            <BarChart advertisements={statistics.advertisements} />
          </div>
          <div className="ok">
            <CategoryDonutChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
