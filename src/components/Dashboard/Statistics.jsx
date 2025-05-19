import React from "react";

const Statistics = ({ stat }) => {
  return (
    <div className="border rounded-md p-4 md:p-8 bg-white shadow-sm">
      <h2 className="font-semibold">{stat.title}</h2>
      <div className="flex items-center gap-2 mt-2">
        {<stat.icon className="w-8 h-8 text-green-500" />}
        <h3 className="text-2xl md:text-4xl font-semibold">{stat.count}</h3>
      </div>
    </div>
  );
};

export default Statistics;
