import React from "react";
import ReactApexChart from "react-apexcharts";
import useFetchCategory from "../../../hooks/useFetchCategory";

const CategoryDonutChart = () => {
  const { categories, loading } = useFetchCategory();

  const series = categories.map((category) => category.advertise_count);
  const options = {
    chart: {
      type: "donut",
    },
    // labels: ["Family", "Bachelor", "Sublet", "Others"],
    labels: categories.map((category) => category.name),
    colors: ["#34D399", "#60A5FA", "#FBBF24", "#F87171", "#C97151"],
    legend: {
      position: "bottom",
    },
    dataLabels: {
      enabled: true,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { width: 300 },
          legend: { position: "bottom" },
        },
      },
    ],
  };

  return (
    <div className="bg-white p-4 md:p-8 mt-4 md:mt-0 shadow rounded-xl w-full">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Listing Categories
      </h2>
      {loading ? (
        <div className="flex justify-center items-center h-[350px]">
          <div className="loader"></div>
        </div>
      ) : (
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          height={350}
        />
      )}
    </div>
  );
};

export default CategoryDonutChart;
