import React, { useState } from "react";
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
  const [studentRegNumber, setStudentRegNumber] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [facultyRegNumber, setFacultyRegNumber] = useState("");
  const [facultyPassword, setFacultyPassword] = useState("");
  const [isStudentLoading, setIsStudentLoading] = useState(false);
  const [isFacultyLoading, setIsFacultyLoading] = useState(false);
  const studentSubmitHandler = (event) => {
    event.preventDefault();
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
                  <form onSubmit={studentSubmitHandler}>
                    <Typography sx={{ m: 2 }} variant="h4">
                      {props.typeName}
                    </Typography>
                    <FormControl fullWidth sx={{ m: 2 }}>
                      <TextField
                        id="regNumber"
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
                        id="password"
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
                  <form onSubmit={facultySubmitHandler}>
                    <Typography sx={{ m: 2 }} variant="h4">
                      {props.typeName}
                    </Typography>
                    <FormControl fullWidth sx={{ m: 2 }}>
                      <TextField
                        id="regNumber"
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
                        id="password"
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
