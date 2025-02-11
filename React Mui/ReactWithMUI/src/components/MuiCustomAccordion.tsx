import { AccordionSummary } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomAccordionSummary = styled(AccordionSummary)({
  "& .MuiAccordionSummary-content": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
  },
});

export default CustomAccordionSummary;
