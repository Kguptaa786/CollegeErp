import { useContext } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import { Grid, CardContent, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import NavbarStudent from "../../components/NavbarStudent";
import axios from "axios";
import EndPointContext from "../../context/EndPointContext";
const useStyles = makeStyles({
  root: {
    position: "absolute",
    marginTop: "100px",
  },
  child: {
    margin: "20px",
  },
});

function PeerStudent(props) {
  const ENDPOINT = useContext(EndPointContext).ENDPOINT;
  const classes = useStyles();
  const params = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({});
  const [currRegistrationNumber, setCurrRegistrationNumber] = useState("");

  useEffect(() => {
    if (localStorage.getItem("studentToken") === null) {
      navigate("/");
    }
    setCurrRegistrationNumber(
      jwt_decode(localStorage.getItem("studentToken")).registrationNumber
    );
  }, [navigate]);

  useEffect(() => {
    axios
      .get(ENDPOINT + `student/${params.registrationNumber}`)
      .then((res) => setStudent(res.data.student))
      .catch((e) => console.log(e));
  }, [params.registrationNumber, ENDPOINT]);

  return (
    <>
      <Grid container direction="column" justifyContent="space-between">
        <Box>
          <NavbarStudent />
        </Box>
        <Box>
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
                  height="210"
                  image={require("../../images/default-avatar.png")}
                  alt={student.name}
                />
                <CardHeader
                  title={student.name}
                  subheader={
                    <Link
                      to={`../../student/chat/${
                        student.registrationNumber +
                        "_" +
                        currRegistrationNumber
                      }`}
                    >
                      Chat
                    </Link>
                  }
                />
              </Card>
            </Box>
            <Box className={classes.child}>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography variant="h6">Name: {student.name}</Typography>
                </CardContent>
                <CardContent>
                  <Typography variant="h6">
                    Department: {student.department}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Typography variant="h6">
                    Section: {student.section}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </>
  );
}

export default PeerStudent;
