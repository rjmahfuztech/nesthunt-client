import React from "react";

const Statistics = ({ stat }) => {
  return (
    <div className="border rounded-md p-4 bg-white shadow-sm">
      <h2 className="text-lg font-bold">{stat.title}</h2>
      <div className="flex items-center gap-2 mt-2">
        {<stat.icon className="w-7 h-7 text-green-500" />}
        <h3 className="text-2xl font-semibold">{stat.count}</h3>
      </div>
    </div>
  );
};

export default Statistics;
