import { InputAdornment, Stack, TextField } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
export const MuiTextField = () => {
  return (
    <Stack spacing={4}>
      <Stack spacing={2} direction="row">
        <TextField label="name" variant="outlined"></TextField>
        <TextField label="name" variant="filled"></TextField>
        <TextField label="name" variant="standard"></TextField>
      </Stack>
      <Stack spacing={2} direction="row">
        <TextField
          label="small outlined"
          variant="outlined"
          size="small"
          color="secondary"
        ></TextField>
      </Stack>
      <Stack spacing={2} direction="row">
        <TextField label="Form Input" required></TextField>
        <TextField
          label="password"
          type="password"
          helperText="Do not share your password with anyone"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VisibilityOffIcon></VisibilityOffIcon>
              </InputAdornment>
            ),
          }}
        ></TextField>

        <TextField
          label="Read only"
          InputProps={{ readOnly: true }}
          disabled
          required
        ></TextField>
      </Stack>
      <Stack spacing={2} direction="row">
        <TextField
          label="Amount"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          required
        ></TextField>
        <TextField
          label="Weight"
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }}
          required
        ></TextField>
      </Stack>
    </Stack>
  );
};
