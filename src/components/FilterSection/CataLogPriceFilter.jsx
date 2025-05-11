import React, { useState, useEffect } from "react";
import "./CatLogPriceFilter.css";

const CataLogPriceFilter = ({
  minVal,
  setMinVal,
  maxVal,
  setMaxVal,
  sliderMinValue,
  sliderMaxValue,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const minGap = 5;

  useEffect(() => {
    setSliderTrack();
  }, [minVal, maxVal]);

  const slideMin = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= sliderMinValue && maxVal - value >= minGap) {
      setMinVal(value);
    }
  };

  const slideMax = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value <= sliderMaxValue && value - minVal >= minGap) {
      setMaxVal(value);
    }
  };

  const setSliderTrack = () => {
    const range = document.querySelector(".slider-track");

    if (range) {
      const minPercent =
        ((minVal - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;
      const maxPercent =
        ((maxVal - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;

      range.style.left = `${minPercent}%`;
      range.style.right = `${100 - maxPercent}%`;
    }
  };

  const startDrag = () => {
    setIsDragging(true);
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  return (
    <div className="double-slider-box">
      <div className="range-slider">
        <div className="slider-track"></div>
        <input
          type="range"
          min={sliderMinValue}
          max={sliderMaxValue}
          value={minVal}
          onChange={slideMin}
          onMouseDown={startDrag}
          onMouseUp={stopDrag}
          onTouchStart={startDrag}
          onTouchEnd={stopDrag}
          className="min-val"
        />
        <input
          type="range"
          min={sliderMinValue}
          max={sliderMaxValue}
          value={maxVal}
          onChange={slideMax}
          onMouseDown={startDrag}
          onMouseUp={stopDrag}
          onTouchStart={startDrag}
          onTouchEnd={stopDrag}
          className="max-val"
        />
        {isDragging && <div className="min-tooltip ml-2">{minVal}</div>}
        {isDragging && <div className="max-tooltip mr-2">{maxVal}</div>}
      </div>
    </div>
  );
};

export default CataLogPriceFilter;
