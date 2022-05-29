import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  Container,
  Card,
  FormControl,
  TextField,
  Button,
} from "@mui/material";

import Image from "../images/main3.jpg";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  bgImage: {
    backgroundImage: `url(${Image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100%",
  },
  loginStyle: {
    marginTop: "1rem",
    marginBottom: "2rem",
  },
});

function FacultyStudentLoginPage(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  console.log(navigate);
  const [studentRegNumber, setStudentRegNumber] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [facultyRegNumber, setFacultyRegNumber] = useState("");
  const [facultyPassword, setFacultyPassword] = useState("");
  const studentSubmitHandler = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:4000/", {
        registrationNumber: studentRegNumber,
        password: studentPassword,
      })
      .then((res) => {
        console.log(res);
        navigate("/student");
        // if (res.status === 400 || !data) {
        //   navigate("/");
        //   window.alert("Invalid Credentials");
        // } else {
        //   navigate("/student");
        //   window.alert("Successfully logged in");
        // }
      })
      .catch((err) => console.log(err));
  };
  const facultySubmitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <div className={classes.bgImage}>
        <Grid container alignItems="center" justifyContent="end">
          <Grid item xs={12} md={4}>
            <div className={classes.loginStyle}>
              <Container>
                <Card>
                  <h2>Student Login</h2>
                  <form onSubmit={studentSubmitHandler}>
                    <Typography sx={{ m: 2 }} variant="h4">
                      {props.typeName}
                    </Typography>
                    <FormControl fullWidth sx={{ m: 2 }}>
                      <TextField
                        id="studRegNumber"
                        label="Registration Number"
                        variant="outlined"
                        value={studentRegNumber}
                        onChange={(e) => {
                          setStudentRegNumber(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 2 }}>
                      <TextField
                        id="studPassword"
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={studentPassword}
                        onChange={(e) => setStudentPassword(e.target.value)}
                      />
                    </FormControl>

                    <Button sx={{ m: 2 }} variant="contained" type="submit">
                      Log In
                    </Button>
                  </form>
                </Card>
              </Container>
            </div>
            <div>
              <Container>
                <Card>
                  <h2>Faculty Login</h2>
                  <form onSubmit={facultySubmitHandler}>
                    <Typography sx={{ m: 2 }} variant="h4">
                      {props.typeName}
                    </Typography>
                    <FormControl fullWidth sx={{ m: 2 }}>
                      <TextField
                        id="facRegNumber"
                        label="Registration Number"
                        variant="outlined"
                        value={facultyRegNumber}
                        onChange={(e) => {
                          setFacultyRegNumber(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 2 }}>
                      <TextField
                        id="facPassword"
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={facultyPassword}
                        onChange={(e) => setFacultyPassword(e.target.value)}
                      />
                    </FormControl>

                    <Button sx={{ m: 2 }} variant="contained" type="submit">
                      Log In
                    </Button>
                  </form>
                </Card>
              </Container>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default FacultyStudentLoginPage;
