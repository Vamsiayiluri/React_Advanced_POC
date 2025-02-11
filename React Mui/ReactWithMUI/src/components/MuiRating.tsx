import {
  Box,
  IconContainerProps,
  Rating,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

export const MuiRating = () => {
  const [rating, setrating] = useState<number | null>(null);
  const [values, setValues] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<{}>, newValue: number | null) => {
    setrating(newValue);
  };
  const customIcons: {
    [index: string]: {
      icon: React.ReactElement<unknown>;
      label: string;
    };
  } = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon color="error" />,
      label: "Very Dissatisfied",
    },
    2: {
      icon: <SentimentDissatisfiedIcon color="error" />,
      label: "Dissatisfied",
    },
    3: {
      icon: <SentimentSatisfiedIcon color="warning" />,
      label: "Neutral",
    },
    4: {
      icon: <SentimentSatisfiedAltIcon color="success" />,
      label: "Satisfied",
    },
    5: {
      icon: <SentimentVerySatisfiedIcon color="success" />,
      label: "Very Satisfied",
    },
  };
  function IconContainer(props: IconContainerProps) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }
  const StyledRating = styled(Rating)(({ theme }) => ({
    "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
      color: theme.palette.action.disabled,
    },
  }));
  return (
    <Stack spacing={2}>
      <Rating
        value={rating}
        precision={0.5}
        onChange={handleChange}
        size="large"
        icon={<FavoriteIcon color="error"></FavoriteIcon>}
        emptyIcon={<FavoriteBorderIcon></FavoriteBorderIcon>}
      ></Rating>
      <Box sx={{ "& > legend": { mt: 2 } }}>
        <Rating
          name="simple-controlled"
          value={values}
          onChange={(event, newValue) => {
            setValues(newValue);
          }}
          onChangeActive={handleChange}
        />

        <Rating
          name="simple-controlled"
          value={values}
          onChange={(event, newValue) => {
            setValues(newValue);
          }}
        />

        <Typography component="legend">Read only</Typography>
        <Rating name="read-only" value={values} readOnly />
        <Typography component="legend">Disabled</Typography>
        <Rating name="disabled" value={values} disabled />
        <Typography component="legend">No rating given</Typography>
        <Rating name="no-value" value={null} />
      </Box>
      <StyledRating
        name="highlight-selected-only"
        defaultValue={2}
        IconContainerComponent={IconContainer}
        getLabelText={(value: number) => customIcons[value].label}
        highlightSelectedOnly
      />
    </Stack>
  );
};
