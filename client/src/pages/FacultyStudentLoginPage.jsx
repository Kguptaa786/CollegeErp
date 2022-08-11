import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Grid,
  Container,
  Card,
  FormControl,
  TextField,
  Button,
} from "@mui/material";

import Image from "../images/main3.jpg";
import { makeStyles } from "@mui/styles";
import EndPointContext from "../context/EndPointContext";

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
  const ENDPOINT = useContext(EndPointContext).ENDPOINT;
  // console.log(ENDPOINT);
  const classes = useStyles();
  const navigate = useNavigate();
  const [studentRegNumber, setStudentRegNumber] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [facultyRegNumber, setFacultyRegNumber] = useState("");
  const [facultyPassword, setFacultyPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("adminToken") !== null) {
      navigate("/admin");
    }
    if (localStorage.getItem("studentToken") !== null) {
      navigate("/student");
    }
    if (localStorage.getItem("facultyToken") !== null) {
      navigate("/faculty");
    }
  }, [navigate]);
  const studentSubmitHandler = async (event) => {
    event.preventDefault();
    await axios
      .post(ENDPOINT + "studentLogin", {
        registrationNumber: studentRegNumber,
        password: studentPassword,
      })
      .then((res) => {
        localStorage.setItem("studentToken", res.data.token);
        window.alert(res.data.message);
        navigate("/student");
      })
      .catch((err) => {
        window.alert(err.response.data.message);
        navigate("/");
      });
    setStudentRegNumber("");
    setStudentPassword("");
  };
  const facultySubmitHandler = async (event) => {
    event.preventDefault();
    await axios
      .post(ENDPOINT + "facultyLogin", {
        registrationNumber: facultyRegNumber,
        password: facultyPassword,
      })
      .then((res) => {
        localStorage.setItem("facultyToken", res.data.token);
        window.alert(res.data.message);
        navigate("/faculty");
      })
      .catch((err) => {
        // console.log(err);
        window.alert(err.response.data.message);
        navigate("/");
      });
    setFacultyRegNumber("");
    setFacultyPassword("");
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
