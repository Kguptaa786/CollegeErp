import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  Card,
} from "@mui/material";

function AdminLogin(props) {
  const navigate = useNavigate();
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:4000/adminLogin", {
        registrationNumber,
        password,
      })
      .then((res) => {
        window.alert("Successfully Logged in...");
        navigate("/admin");
      })
      .catch((err) => console.log(err));
  };
  return (
    <Fragment>
      <Grid container justifyContent="center">
        <Grid>
          <Container>
            <Card>
              <form onSubmit={submitHandler}>
                <Typography sx={{ m: 2 }} variant="h4">
                  Admin Login
                </Typography>
                <FormControl sx={{ m: 2 }}>
                  <TextField
                    id="registrationNumber"
                    label="Registration Number"
                    variant="outlined"
                    value={registrationNumber}
                    onChange={(e) => {
                      setRegistrationNumber(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl sx={{ m: 2 }}>
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <Button sx={{ m: 2 }} variant="contained" type="submit">
                  Log In
                </Button>
              </form>
            </Card>
          </Container>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default AdminLogin;
