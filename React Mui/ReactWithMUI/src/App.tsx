import { MuiButton } from "./components/MuiButton";
import { MuiCheckBox } from "./components/MuiCheckbox";
import { MuiRadioButton } from "./components/MuiRadioButton";
import { MuiRating } from "./components/MuiRating";
import { MuiSelect } from "./components/MuiSelect";
import { MuiSwitch } from "./components/MuiSwitch";
import { MuiTextField } from "./components/MuiTextField";
import { MuiTypography } from "./components/MuiTypography";

import MuiAutocomplete from "./components/MuiAutocomplete";
import { MuiLayout } from "./components/MuiLayout";
import MuiFab from "./components/MuiFab";
import MuiSlider from "./components/MuiSlider";
import MuiList from "./components/MuiList";
import MuiTable from "./components/MuiTable";
import MuiTooltip from "./components/MuiTooltip";
import MuiAlert from "./components/MuiAlert";
import MuiDialogTest from "./components/MuiDialogTest";
import MuiProgress from "./components/MuiProgress";
import MuiCard from "./components/MuiCard";
import MuiPaper from "./components/MuiPaper";
import MuiAccordion from "./components/MuiAccordion";
import { Typography } from "@mui/material";

function App() {
  return (
    <>
      <Typography variant="h5"> Typography Sample</Typography>
      <MuiTypography></MuiTypography>
      <Typography variant="h5"> Button Sample</Typography>
      <MuiButton></MuiButton>
      <Typography variant="h5"> TextField Sample</Typography>
      <MuiTextField></MuiTextField>
      <Typography variant="h5"> Select Sample</Typography>
      <MuiSelect></MuiSelect>
      <Typography variant="h5"> RadioButton Sample</Typography>
      <MuiRadioButton></MuiRadioButton>
      <Typography variant="h5"> CheckBox Sample</Typography>
      <MuiCheckBox></MuiCheckBox>
      <Typography variant="h5"> Switch Sample</Typography>
      <MuiSwitch></MuiSwitch>
      <Typography variant="h5"> Rating Sample</Typography>
      <MuiRating></MuiRating>
      <Typography variant="h5"> Layout Sample</Typography>
      <MuiLayout></MuiLayout>
      <Typography variant="h5"> Autocomplete Sample</Typography>
      <MuiAutocomplete></MuiAutocomplete>
      <Typography variant="h5"> Fab Sample</Typography>
      <MuiFab></MuiFab>
      <Typography variant="h5"> Slider Sample</Typography>
      <MuiSlider></MuiSlider>
      <Typography variant="h5"> List Sample</Typography>
      <MuiList></MuiList>
      <Typography variant="h5"> Table Sample</Typography>
      <MuiTable></MuiTable>
      <Typography variant="h5"> Tooltip Sample</Typography>
      <MuiTooltip></MuiTooltip>
      <Typography variant="h5"> Alert Sample</Typography>
      <MuiAlert></MuiAlert>
      <Typography variant="h5"> DialogTest Sample</Typography>
      <MuiDialogTest></MuiDialogTest>
      <Typography variant="h5"> Progress Sample</Typography>
      <MuiProgress></MuiProgress>
      <Typography variant="h5"> Card Sample</Typography>
      <MuiCard></MuiCard>
      <Typography variant="h5"> Paper Sample</Typography>
      <MuiPaper></MuiPaper>
      <Typography variant="h5"> Accordion Sample</Typography>
      <MuiAccordion></MuiAccordion>
    </>
  );
}

export default App;
