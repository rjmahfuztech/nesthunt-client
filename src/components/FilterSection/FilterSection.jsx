import {
  Button,
  Card,
  Input,
  Select,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import CataLogPriceFilter from "./CataLogPriceFilter";
import useFetchCategory from "../../hooks/useFetchCategory";
import { Controller } from "react-hook-form";
import useAppContext from "../../hooks/useAppContext";

const FilterSection = ({ register, handleSubmit, onSubmit, control }) => {
  const { categories } = useFetchCategory();
  const { setRentPrice } = useAppContext();

  // price filter
  const initialMinPrice = 0;
  const initialMaxPrice = 50000;

  const [sliderMinValue] = useState(initialMinPrice);
  const [sliderMaxValue] = useState(initialMaxPrice);

  const [minVal, setMinVal] = useState(initialMinPrice);
  const [maxVal, setMaxVal] = useState(initialMaxPrice);

  // set minimum and maximum rent amount
  useEffect(() => {
    if (minVal || maxVal) setRentPrice([minVal, maxVal]);
  }, [minVal, maxVal]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="max-w-[26rem] mx-auto p-4 overflow-hidden shadow-lg">
        {/* searchQuery  */}
        <div className="mb-4 mt-2 space-y-1.5">
          <Typography
            as="label"
            htmlFor="searchQuery"
            type="small"
            color="default"
            className="font-semibold"
          >
            Title or Location
          </Typography>
          <Input
            {...register("searchQuery")}
            id="searchQuery"
            placeholder="search by title or location..."
          />
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
          {/* used controller  */}
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(val) => field.onChange(val)}
                id="category"
              >
                <Select.Trigger
                  className="w-full"
                  placeholder="Choose Category"
                />
                <Select.List>
                  <Select.Option className="border-b" value="">
                    Default
                  </Select.Option>
                  {categories.map((category) => (
                    <Select.Option
                      className="border-b"
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </Select.Option>
                  ))}
                </Select.List>
              </Select>
            )}
          />
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
              {...register("bedroom")}
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
              {...register("bathroom")}
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
          <CataLogPriceFilter
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
    </form>
  );
};

export default FilterSection;
