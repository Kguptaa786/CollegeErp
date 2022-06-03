import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import { Grid, CardContent, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    position: "absolute",
    marginTop: "100px",
  },
  child: {
    margin: "20px",
  },
});
function Dashboard(props) {
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.root}
      direction="row"
      justifyContent="center"
      alignContent="center"
    >
      <Box className={classes.child}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="194"
            image="../../public/images/main.jpg"
            alt="Krishna"
          />
          <CardHeader
            title={props.data.name}
            subheader={props.data.registrationNumber}
          />
        </Card>
      </Box>
      <Box className={classes.child}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography variant="h6">{props.data.name}</Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h6">{props.data.email}</Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h6">{props.data.dob}</Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h6">{props.data.department}</Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h6">{props.data.contactNummber}</Typography>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
}
export default Dashboard;
