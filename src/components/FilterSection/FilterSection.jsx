import {
  Button,
  Card,
  Input,
  Select,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import CatlogPriceFilter from "./CatLogPriceFilter";

const FilterSection = () => {
  const initialMinPrice = 3000;
  const initialMaxPrice = 50000;

  const [sliderMinValue] = useState(initialMinPrice);
  const [sliderMaxValue] = useState(initialMaxPrice);

  const [minVal, setMinVal] = useState(initialMinPrice);
  const [maxVal, setMaxVal] = useState(initialMaxPrice);

  return (
    <div>
      <Card className="sm:min-w-[20rem] max-w-[24rem] p-4 overflow-hidden">
        {/* Location  */}
        <div className="mb-4 mt-2 space-y-1.5">
          <Typography
            as="label"
            htmlFor="location"
            type="small"
            color="default"
            className="font-semibold"
          >
            Location
          </Typography>
          <Input id="location" placeholder="Location..." />
        </div>
        {/* Category  */}
        <div className="mb-4 mt-2 space-y-1.5">
          <Typography
            as="label"
            htmlFor="category"
            type="small"
            color="default"
            className="font-semibold"
          >
            Category
          </Typography>
          <Select id="category">
            <Select.Trigger className="w-full" placeholder="Choose Category" />
            <Select.List className="bg-orange-50">
              <Select.Option>Material Tailwind React</Select.Option>
              <Select.Option>Material Tailwind HTML</Select.Option>
              <Select.Option>Material Tailwind Vue</Select.Option>
              <Select.Option>Material Tailwind Svelte</Select.Option>
            </Select.List>
          </Select>
        </div>
        <div className="flex gap-2">
          {/* Bedroom  */}
          <div className="mb-4  space-y-1.5">
            <Typography
              as="label"
              htmlFor="bedroom"
              type="small"
              color="default"
              className="font-semibold"
            >
              Bedroom
            </Typography>
            <Input
              className="!w-full"
              type="number"
              id="bedroom"
              placeholder="bedroom"
            />
          </div>
          {/* Bathroom  */}
          <div className="mb-4  space-y-1.5">
            <Typography
              as="label"
              htmlFor="bathroom"
              type="small"
              color="default"
              className="font-semibold"
            >
              Bathroom
            </Typography>
            <Input
              className="!w-full"
              type="number"
              id="bathroom"
              placeholder="bathroom"
            />
          </div>
        </div>
        {/* Price Filter  */}
        <div className="mb-4  space-y-1.5">
          <Typography
            as="label"
            htmlFor="price"
            type="small"
            color="default"
            className="font-semibold"
          >
            Price Range:{" "}
            <span className="font-medium text-gray-500">
              ${minVal} - ${maxVal}
            </span>
          </Typography>
          <CatlogPriceFilter
            sliderMinValue={sliderMinValue}
            sliderMaxValue={sliderMaxValue}
            minVal={minVal}
            setMinVal={setMinVal}
            maxVal={maxVal}
            setMaxVal={setMaxVal}
          />
        </div>
        <Button className="bg-green-600 w-full mb-2 px-8 py-3 font-bold hover:bg-green-700 border-none">
          Find House
        </Button>
      </Card>
    </div>
  );
};

export default FilterSection;
