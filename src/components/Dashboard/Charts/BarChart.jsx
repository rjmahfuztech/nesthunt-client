import ReactApexChart from "react-apexcharts";

const BarChart = () => {
  const chartOptions = {
    chart: {
      id: "monthly-listings",
      toolbar: { show: false },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    colors: ["#4F46E5"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    grid: {
      borderColor: "#E5E7EB",
    },
  };

  const chartSeries = [
    {
      name: "Listings",
      data: [12, 25, 18, 30, 22, 40], // Replace with dynamic data if needed
    },
  ];

  return (
    <div className="w-full bg-white p-4 md:p-8 shadow rounded-xl">
      <h2 className="text-lg font-semibold mb-4">Monthly House Listings</h2>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={335}
      />
    </div>
  );
};

export default BarChart;
