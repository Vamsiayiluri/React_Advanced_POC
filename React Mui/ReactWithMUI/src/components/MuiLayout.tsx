import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";

export const MuiLayout = () => {
  return (
    <>
      <Stack
        direction="column"
        spacing={2}
        divider={<Divider orientation="horizontal" flexItem></Divider>}
        sx={{
          border: "2px solid",
        }}
      >
        <Box
          sx={{
            margin: "10px",
            padding: "10px",
            backgroundColor: "red",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography>Hello Everyone</Typography>
          <Button>Click me</Button>
          <Button>Click me</Button>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Button>Click me</Button>
          <Button>Click me</Button>
        </Box>
      </Stack>
      <Grid container my={4} rowSpacing={2} columnSpacing={1}>
        <Grid item xs={6}>
          <Box bgcolor="tomato">Item 1</Box>
        </Grid>{" "}
        <Grid item xs={6}>
          <Box bgcolor="tomato">Item 2</Box>
        </Grid>{" "}
        <Grid item xs={6}>
          <Box bgcolor="tomato">Item 3</Box>
        </Grid>{" "}
        <Grid item xs={6}>
          <Box bgcolor="tomato">Item 4</Box>
        </Grid>
      </Grid>
    </>
  );
};
