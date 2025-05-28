import { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { parseISO, getMonth } from "date-fns";

const BarChart = ({ advertisements }) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthData = useMemo(() => {
    const counts = Array(12).fill(0);

    advertisements?.forEach((ad) => {
      const monthIndex = getMonth(parseISO(ad.created_at));
      counts[monthIndex]++;
    });

    return counts;
  }, [advertisements]);

  const chartOptions = {
    chart: {
      id: "monthly-listings",
      toolbar: { show: false },
    },
    xaxis: {
      categories: months,
      labels: {
        // rotate: -45,
        style: {
          fontSize: "12px",
        },
      },
    },
    colors: ["#4F46E5"],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    grid: {
      borderColor: "#E5E7EB",
    },
    responsive: [
      {
        breakpoint: 768, // screens < 768px (e.g., tablets and phones)
        options: {
          chart: {
            height: 280,
          },
          xaxis: {
            labels: {
              rotate: -30,
              style: {
                fontSize: "10px",
              },
            },
          },
          plotOptions: {
            bar: {
              columnWidth: "60%",
            },
          },
        },
      },
      {
        breakpoint: 480, // phones
        options: {
          chart: {
            height: 250,
          },
          xaxis: {
            labels: {
              rotate: -20,
              style: {
                fontSize: "9px",
              },
            },
          },
          plotOptions: {
            bar: {
              columnWidth: "70%",
            },
          },
        },
      },
    ],
  };

  const chartSeries = [
    {
      name: "Listings",
      data: monthData, // Replace with dynamic data if needed
    },
  ];

  return (
    <div className="w-full bg-white p-4 md:p-8 shadow rounded-xl">
      <h2 className="text-lg font-semibold mb-4">Monthly House Listings</h2>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default BarChart;
