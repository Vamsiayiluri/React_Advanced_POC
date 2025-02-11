import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";

import Box from "@mui/material/Box";
import { green } from "@mui/material/colors";
import Button from "@mui/material/Button";

export default function MuiProgress() {
  const [loading, setLoading] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setLoading(true);
      timer.current = setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ m: 1, position: "relative" }}>
          <Button
            variant="contained"
            disabled={loading}
            onClick={handleButtonClick}
          >
            Submit
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: green[500],
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
      </Box>
    </>
  );
}
