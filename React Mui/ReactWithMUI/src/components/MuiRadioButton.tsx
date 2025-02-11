import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";

export const MuiRadioButton = () => {
  const [value, setValue] = useState("0-2");
  console.log(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <Box>
      <FormControl>
        <FormLabel id="job-experience-group-label">
          Years of experience
        </FormLabel>
        <RadioGroup
          name="job-experience-group"
          value={value}
          onChange={handleChange}
          row
        >
          <FormControlLabel
            control={<Radio size="small" color="secondary"></Radio>}
            label="0-2"
            value="0-2"
          ></FormControlLabel>
          <FormControlLabel
            control={<Radio size="small" color="secondary"></Radio>}
            label="3-5"
            value="3-5"
          ></FormControlLabel>
          <FormControlLabel
            control={<Radio size="small" color="secondary"></Radio>}
            label="6-10"
            value="6-10"
          ></FormControlLabel>
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
