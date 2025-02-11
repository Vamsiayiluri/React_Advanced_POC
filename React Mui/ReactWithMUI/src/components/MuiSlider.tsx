import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import MuiSliderWithInput from "./MuiSliderWIthInput";

export default function MuiSlider() {
  const marks = [
    {
      value: 0,
      label: "0°C",
    },
    {
      value: 20,
      label: "20°C",
    },
    {
      value: 37,
      label: "37°C",
    },
    {
      value: 100,
      label: "100°C",
    },
  ];
  function valuetext(value: number) {
    return `${value}°C`;
  }
  const [value, setValue] = useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    console.log(newValue, "value");
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
      <Slider
        size="small"
        aria-label="Small"
        valueLabelDisplay="on"
        getAriaValueText={valuetext}
        step={null}
        marks={marks}
      />
      <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        color="secondary"
      />
      <MuiSliderWithInput></MuiSliderWithInput>
    </Box>
  );
}
