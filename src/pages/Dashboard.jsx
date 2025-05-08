import React, { useEffect, useState } from "react";
import Statistics from "../components/Dashboard/Statistics";
import {
  Calendar,
  CalendarMinus,
  Clock,
  Group,
  Megaphone,
} from "iconoir-react";
import authApiClient from "../services/authApiClient";

const Dashboard = () => {
  const [statTotal, setStatTotal] = useState({});
  useEffect(() => {
    authApiClient
      .get("/admin/dashboard/")
      .then((res) => setStatTotal(res.data))
      .catch((err) => console.log(err));
  }, []);

  const statInfo = [
    { icon: Group, title: "Total Users", count: statTotal.total_users },
    {
      icon: Megaphone,
      title: "Total Advertisements",
      count: statTotal.total_advertisement,
    },
    {
      icon: Clock,
      title: "Total Pending Advertisements",
      count: statTotal.total_pending_advertisement,
    },
    {
      icon: Calendar,
      title: "Current Month Advertisements",
      count: statTotal.current_month_advertisement,
    },
    {
      icon: CalendarMinus,
      title: "Last Month Advertisements",
      count: statTotal.last_month_advertisement,
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-4">
        {statInfo.map((stat, index) => (
          <Statistics key={index} stat={stat} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
