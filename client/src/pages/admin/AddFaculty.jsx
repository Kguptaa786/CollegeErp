import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
import { makeStyles } from "@mui/styles";
import NavbarAdmin from "../../components/NavbarAdmin";

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

function AddFaculty() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
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
        "http://localhost:4000/admin/addFaculty",
        {
          name,
          email,
          department,
          designation,
          gender,
          dob,
          contactNumber,
          aadharNumber,
        },
        { headers: headers }
      )
      .then((res) => {
        window.alert(res.data.message);
        setName("");
        setEmail("");
        setDesignation("");
        setGender("");
        setDob("");
        setContactNumber("");
        setAadharNumber("");
        setDepartment("");
      })
      .catch((err) => {
        console.log(err);
        window.alert("All field required");
      });
  };

  return (
    <>
      <NavbarAdmin />
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} md={6}>
          <form onSubmit={submitHandler}>
            <FormControl fullWidth sx={{ m: 2 }}>
              <TextField
                id="standard-basic"
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
                id="standard-basic"
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
            <FormControl fullWidth sx={{ m: 2 }}>
              <InputLabel id="demo-simple-select-label">Designation</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Designation"
                value={designation}
                onChange={(e) => {
                  setDesignation(e.target.value);
                }}
              >
                <MenuItem value="Assistant Professor">
                  Assistant Professor
                </MenuItem>
                <MenuItem value="Professor">Professor</MenuItem>
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
                id="date"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
              <TextField
                id="standard-basic"
                label="Contact Number"
                variant="standard"
                type="number"
                value={contactNumber}
                onChange={(e) => {
                  setContactNumber(e.target.value);
                }}
              />
            </FormControl>

            <FormControl fullWidth sx={{ m: 2 }}>
              <TextField
                id="standard-basic"
                label="Aadhar Card Number"
                type="number"
                variant="standard"
                value={aadharNumber}
                onChange={(e) => setAadharNumber(e.target.value)}
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

export default AddFaculty;
