import React from "react";
import { Accordion, AccordionDetails, Typography } from "@mui/material";
import CustomAccordionSummary from "./MuiCustomAccordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MuiAccordion: React.FC = () => {
  return (
    <Accordion>
      <CustomAccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Booking details</Typography>
        <Typography>Id-2</Typography>
      </CustomAccordionSummary>
      <AccordionDetails>
        <Typography>Here are some booking details...</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default MuiAccordion;
