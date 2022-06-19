import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Button,
  MenuItem,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import NavbarAdmin from "../../components/NavbarAdmin";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
});

function AddAdmin() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [adminToken, setAdminToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("adminToken") === null) {
      navigate("/");
    }
    setAdminToken(localStorage.getItem("adminToken"));
  }, [navigate]);

  const submitHandler = async (event) => {
    event.preventDefault();
    const headers = {
      Authorization: `${adminToken}`,
    };
    await axios
      .post(
        "http://localhost:4000/admin/addAdmin",
        {
          name,
          email,
          department,
          gender,
          dob,
          contactNumber,
        },
        { headers: headers }
      )
      .then((res) => {
        window.alert(res.data.message);
        setName("");
        setEmail("");
        setDepartment("");
        setGender("");
        setDob("");
        setContactNumber("");
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      });
  };

  return (
    <>
      <NavbarAdmin />
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={8} md={6}>
          <form onSubmit={submitHandler} noValidate>
            <FormControl fullWidth sx={{ m: 2 }}>
              <TextField
                id="name"
                label="Name"
                variant="standard"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
              <TextField
                id="email"
                label="Email"
                variant="standard"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
              <InputLabel id="demo-simple-select-label">Department</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Department"
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                }}
              >
                <MenuItem value="CE">CIVIL ENGINEERING</MenuItem>
                <MenuItem value="CSE">COMPUTER SCIENCE & ENGINEERING</MenuItem>
                <MenuItem value="EE">ELECTRICAL ENGINEERING</MenuItem>
                <MenuItem value="ECE">
                  ELECTRONICS & COMMUNICATION ENGINEERING
                </MenuItem>
                <MenuItem value="ME">MECHANICAL ENGINEERING</MenuItem>
                <MenuItem value="MME">
                  MATERIALS & METALLURGICAL ENGINEERING
                </MenuItem>
                <MenuItem value="CHEM">CHEMICAL ENGINEERING</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ m: 2 }}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Date of Birth
              </FormLabel>
              <TextField
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
              <TextField
                id="contactNumber"
                label="Contact Number"
                type="number"
                variant="standard"
                value={contactNumber}
                onChange={(e) => {
                  setContactNumber(e.target.value);
                }}
              />
            </FormControl>
            <Button
              sx={{ m: 2 }}
              variant="contained"
              color="success"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
}

export default AddAdmin;
