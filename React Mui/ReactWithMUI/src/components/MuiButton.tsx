import {
  Button,
  ButtonGroup,
  Fab,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

import Badge, { badgeClasses } from "@mui/material/Badge";
import React, { useState } from "react";
export const MuiButton = () => {
  const [formats, setFormats] = useState<string[]>([]);
  console.log(formats, "data");
  const handleFormatChange = (
    event: React.MouseEvent<HTMLElement>,
    updatedFormats: string[]
  ) => {
    setFormats(updatedFormats);
  };
  return (
    <Stack spacing={4}>
      <Stack spacing={2} direction="row">
        <Button variant="text">text</Button>
        <Button variant="contained">contained</Button>
        <Button variant="outlined">outlined</Button>
      </Stack>
      <Stack spacing={2} direction="row">
        <Button variant="contained" color="primary">
          primary
        </Button>
        <Button variant="contained" color="secondary">
          secondary
        </Button>
        <Button variant="contained" color="error">
          error
        </Button>
        <Button variant="contained" color="warning">
          warning
        </Button>
        <Button variant="contained" color="info">
          info
        </Button>
        <Button variant="contained" color="success">
          success
        </Button>
      </Stack>
      <Stack display="block" spacing={2} direction="row">
        <Button variant="contained" size="small">
          small
        </Button>
        <Button variant="contained" size="medium">
          medium
        </Button>
        <Button variant="contained" size="large">
          large
        </Button>
      </Stack>
      <Stack spacing={2} direction="row">
        <Button variant="contained" disableRipple startIcon={<SendIcon />}>
          Send
        </Button>
        <Button variant="contained" disableElevation endIcon={<SendIcon />}>
          Send
        </Button>
        <IconButton color="success" size="small">
          <SendIcon></SendIcon>
        </IconButton>

        <IconButton size="small">
          <ShoppingCartIcon fontSize="small" />
          <Badge
            badgeContent={2}
            color="primary"
            overlap="circular"
            sx={{
              bottom: "12px",
              left: "12px",
            }}
          />
        </IconButton>
      </Stack>
      <Stack direction="row">
        <ButtonGroup variant="contained" orientation="vertical" size="small">
          <Button>left</Button>
          <Button>center</Button>
          <Button>right</Button>
        </ButtonGroup>
      </Stack>
      <Stack direction="row">
        <ToggleButtonGroup value={formats} onChange={handleFormatChange}>
          <ToggleButton value="bold">
            <FormatBoldIcon />
          </ToggleButton>
          <ToggleButton value="italic">
            <FormatItalicIcon />
          </ToggleButton>
          <ToggleButton value="underlined">
            <FormatUnderlinedIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Stack spacing={2} direction="row">
        <Fab size="small" color="primary" aria-label="add">
          <SendIcon />
        </Fab>
        <Fab variant="extended" size="small">
          <FavoriteIcon color="error" sx={{ mr: 1 }} />
          Extended
        </Fab>
      </Stack>
    </Stack>
  );
};
