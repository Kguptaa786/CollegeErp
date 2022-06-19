import React, { Fragment, useState, useContext } from "react";
import EndPointContext from "../../context/EndPointContext";
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
  const ENDPOINT = useContext(EndPointContext).ENDPOINT;
  const navigate = useNavigate();
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = async (event) => {
    event.preventDefault();
    await axios
      .post(ENDPOINT + "adminLogin", {
        registrationNumber,
        password,
      })
      .then((res) => {
        localStorage.setItem("adminToken", res.data.token);
        window.alert("Successfully Logged in...");
        navigate("/admin");
      })
      .catch((err) => {
        window.alert(err.response.data.message);
        navigate("/adminLogin");
      });
    setRegistrationNumber("");
    setPassword("");
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
