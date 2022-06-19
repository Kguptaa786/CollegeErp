import React, { Fragment, useEffect, useState, useContext } from "react";
import EndPointContext from "../../context/EndPointContext";
import { useNavigate } from "react-router-dom";
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
import NavbarAdmin from "../../components/NavbarAdmin";
function AdminUpdatePassword(props) {
  const ENDPOINT = useContext(EndPointContext).ENDPOINT;
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [adminToken, setadminToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("adminToken") === null) {
      navigate("/");
    }
    setadminToken(localStorage.getItem("adminToken"));
    setRegistrationNumber(
      jwt_decode(localStorage.getItem("adminToken")).registrationNumber
    );
  }, [navigate]);

  const submitHandler = async (event) => {
    event.preventDefault();
    const headers = {
      Authorization: `${adminToken}`,
    };
    if (newPassword !== cnfPassword) {
      window.alert("New Password and Confirm Password do not match");
      setNewPassword("");
      setCnfPassword("");
      return;
    }
    await axios
      .post(
        ENDPOINT + "admin/updatePassword",
        {
          oldPassword,
          newPassword,
          registrationNumber,
        },
        { headers: headers }
      )
      .then((res) => {
        window.alert(res.data.message);
        localStorage.removeItem("adminToken");
        navigate("/");
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      });
  };
  return (
    <Fragment>
      <NavbarAdmin />
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

export default AdminUpdatePassword;
