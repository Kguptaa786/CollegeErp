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
          <CardHeader title="Krishna Gupta" subheader="STU201903001" />
        </Card>
      </Box>
      <Box className={classes.child}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography variant="h6">Name</Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h6">Email</Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h6">Date of Birth</Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h6">Registration Number</Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h6">Department</Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h6">Contact Number</Typography>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
}
export default Dashboard;
