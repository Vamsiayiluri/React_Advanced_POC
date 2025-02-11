import * as React from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import { green } from "@mui/material/colors";
import { Stack, SxProps } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";

import FavoriteIcon from "@mui/icons-material/Favorite";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

const fabGreenStyle = {
  color: "common.white",
  bgcolor: green[500],
  "&:hover": {
    bgcolor: green[600],
  },
};

export default function MuiFab() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: unknown, newValue: number) => {
    setValue(newValue);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabs = [
    {
      color: "primary" as "primary",
      sx: fabStyle as SxProps,
      icon: <AddIcon />,
      label: "Add",
    },
    {
      color: "secondary" as "secondary",
      sx: fabStyle as SxProps,
      icon: <EditIcon />,
      label: "Edit",
    },
    {
      color: "inherit" as "inherit",
      sx: { ...fabStyle, ...fabGreenStyle } as SxProps,
      icon: <UpIcon />,
      label: "Expand",
    },
  ];

  return (
    <Stack
      sx={{
        bgcolor: "background.paper",
        width: 500,
        position: "relative",
        minHeight: 200,
      }}
      spacing={2}
    >
      <Stack spacing={2} direction="row">
        <Fab size="small" color="primary" aria-label="add">
          <SendIcon />
        </Fab>
        <Fab variant="extended" size="small">
          <FavoriteIcon color="error" sx={{ mr: 1 }} />
          Extended
        </Fab>
      </Stack>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </AppBar>

      {fabs.map((fab, index) => (
        <Zoom
          key={fab.color}
          in={value === index}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${
              value === index ? transitionDuration.exit : 0
            }ms`,
          }}
          unmountOnExit
        >
          <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
    </Stack>
  );
}
