import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHeader } from "@mui/material";

export default function MuiCard() {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardHeader title="Hello Good morning"></CardHeader>

      <CardContent>
        <Typography gutterBottom variant="h5">
          I'm Vamsi
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Thanks</Button>
        <Button size="small">Know More</Button>
      </CardActions>
    </Card>
  );
}
