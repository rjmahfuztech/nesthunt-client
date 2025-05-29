import React from "react";
import ReactApexChart from "react-apexcharts";
import useFetchCategory from "../../../hooks/useFetchCategory";

const CategoryDonutChart = () => {
  const { categories, loading } = useFetchCategory();

  const series = categories.map((category) => category.advertise_count);
  const options = {
    chart: {
      type: "donut",
      width: "100%",
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
    plotOptions: {
      pie: {
        donut: {
          size: "65%", // smaller donut for smaller screen
        },
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom",
            fontSize: "10px",
          },
          plotOptions: {
            pie: {
              donut: {
                size: "55%",
              },
            },
          },
        },
      },
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 280,
          },
          legend: {
            position: "bottom",
            fontSize: "10px",
          },
          dataLabels: {
            style: {
              fontSize: "9px",
            },
          },
        },
      },
    ],
  };

  return (
    <div className="bg-white p-4 lg:p-8 mt-4 md:mt-0 shadow h-full rounded-xl w-full">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Listing Categories
      </h2>
      {loading ? (
        <div className="flex justify-center items-center h-[365px]">
          <div className="loader"></div>
        </div>
      ) : (
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          height={365}
          width="100%"
        />
      )}
    </div>
  );
};

export default CategoryDonutChart;
