import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { useState } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export const MuiCheckBox = () => {
  const [check, setCheck] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheck(e.target.checked);
  };
  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = skills.indexOf(e.target.value);
    if (index === -1) {
      setSkills([...skills, e.target.value]);
    } else {
      setSkills(skills.filter((skill) => skill !== e.target.value));
    }
  };
  return (
    <Box>
      <Box>
        <FormControlLabel
          label="Accept terms and conditions"
          control={
            <Checkbox
              size="small"
              color="secondary"
              checked={check}
              onChange={handleChange}
            ></Checkbox>
          }
        ></FormControlLabel>
        <FormControlLabel
          label="Save"
          control={
            <Checkbox
              icon={<BookmarkBorderIcon></BookmarkBorderIcon>}
              checkedIcon={<BookmarkIcon />}
              checked={check}
              onChange={handleChange}
            ></Checkbox>
          }
        ></FormControlLabel>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>Skills</FormLabel>
          <FormGroup row>
            <FormControlLabel
              label="Html"
              control={
                <Checkbox
                  value="html"
                  checked={skills.includes("html")}
                  onChange={handleSkillsChange}
                ></Checkbox>
              }
            ></FormControlLabel>
            <FormControlLabel
              label="CSS"
              control={
                <Checkbox
                  value="css"
                  checked={skills.includes("css")}
                  onChange={handleSkillsChange}
                ></Checkbox>
              }
            ></FormControlLabel>
            <FormControlLabel
              label="Javascript"
              control={
                <Checkbox
                  value="javascript"
                  checked={skills.includes("javascript")}
                  onChange={handleSkillsChange}
                ></Checkbox>
              }
            ></FormControlLabel>
          </FormGroup>
        </FormControl>
        <FormControl component="fieldset">
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="bottom"
              control={<Checkbox />}
              label="Bottom"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="end"
              control={<Checkbox />}
              label="End"
              labelPlacement="end"
            />
          </FormGroup>
        </FormControl>
      </Box>
    </Box>
  );
};
