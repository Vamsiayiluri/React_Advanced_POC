import { Box, MenuItem, Stack, TextField } from "@mui/material";
import { useState } from "react";

export const MuiSelect = () => {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState<string[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleCountriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCountries(typeof val === "string" ? val.split(",") : val);
  };
  return (
    <Stack width="250px" spacing={2}>
      <TextField
        select
        label="Select Country"
        onChange={handleChange}
        value={value}
        fullWidth
      >
        <MenuItem value="IN">India</MenuItem>
        <MenuItem value="USA">USA</MenuItem>
        <MenuItem value="CANADA">Canada</MenuItem>
      </TextField>
      <TextField
        select
        label="Select Country"
        onChange={handleCountriesChange}
        value={countries}
        fullWidth
        SelectProps={{
          multiple: true,
        }}
        size="small"
        color="secondary"
        helperText="Please select your country"
      >
        <MenuItem value="IND">India</MenuItem>
        <MenuItem value="USA">USA</MenuItem>
        <MenuItem value="CANADA">Canada</MenuItem>
      </TextField>
    </Stack>
  );
};
