import React, { Fragment, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import EndPointContext from "../../context/EndPointContext";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {
  Grid,
  Typography,
  TextField,
  Button,
  FormControl,
  Card,
} from "@mui/material";
import NavbarStudent from "../../components/NavbarStudent";
function StudentUpdatePassword(props) {
  const ENDPOINT = useContext(EndPointContext).ENDPOINT;
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [studentToken, setStudentToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("studentToken") === null) {
      navigate("/");
    }
    setStudentToken(localStorage.getItem("studentToken"));
    setRegistrationNumber(
      jwt_decode(localStorage.getItem("studentToken")).registrationNumber
    );
  }, [navigate]);

  const submitHandler = async (event) => {
    event.preventDefault();
    const headers = {
      Authorization: `${studentToken}`,
    };
    if (newPassword !== cnfPassword) {
      window.alert("New Password and Confirm Password do not match");
      setNewPassword("");
      setCnfPassword("");
      return;
    }
    await axios
      .post(
        ENDPOINT + "student/updatePassword",
        {
          oldPassword,
          newPassword,
          registrationNumber,
        },
        { headers: headers }
      )
      .then((res) => {
        window.alert(res.data.message);
        localStorage.removeItem("studentToken");
        navigate("/");
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      });
  };
  return (
    <Fragment>
      <NavbarStudent />
      <Grid container justifyContent="center" alignContent="center">
        <Grid item xs={12} md={4}>
          <Card>
            <form onSubmit={submitHandler}>
              <Typography sx={{ m: 2 }} variant="h4">
                Update Password
              </Typography>

              <FormControl fullWidth sx={{ m: 2 }}>
                <TextField
                  id="oldpassword"
                  label="Old Password"
                  type="password"
                  variant="outlined"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 2 }}>
                <TextField
                  id="newpassword"
                  label="New Password"
                  type="password"
                  variant="outlined"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 2 }}>
                <TextField
                  id="password"
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  value={cnfPassword}
                  onChange={(e) => setCnfPassword(e.target.value)}
                />
              </FormControl>

              <Button sx={{ m: 2 }} variant="contained" type="submit">
                Submit
              </Button>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default StudentUpdatePassword;
