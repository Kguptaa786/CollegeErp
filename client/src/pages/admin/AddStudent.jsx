import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addStudent } from "../../store/actions/adminAction";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Button,
  MenuItem,
  FormControlLabel,
  Box,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import NavbarAdmin from "../../components/NavbarAdmin";

function AddStudent() {
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentDepartment, setStudentDepartment] = useState("");
  const [studentYear, setStudentYear] = useState("");
  const [studentSection, setStudentSection] = useState("");
  const [studentGender, setStudentGender] = useState("");
  const [studentDob, setStudentDob] = useState("");
  const [studentContactNumber, setStudentContactNumber] = useState("");
  const [studentFatherName, setStudentFatherName] = useState("");
  const [studentFatherContactNumber, setStudentFatherContactNumber] =
    useState("");
  const [studentAadharNumber, setStudentAadharNumber] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:4000/admin/addStudent", {
        studentName,
        studentEmail,
        studentDepartment,
        studentYear,
        studentSection,
        studentGender,
        studentDob,
        studentContactNumber,
        studentFatherName,
        studentFatherContactNumber,
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      <NavbarAdmin />
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} md={6}>
          <Box component="form" onSubmit={submitHandler} noValidate>
            <FormControl fullWidth sx={{ m: 2 }}>
              <TextField
                id="studentName"
                label="Name"
                type="text"
                variant="standard"
                value={studentName}
                onChange={(e) => {
                  setStudentName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
              <TextField
                id="studentEmail"
                label="Email"
                type="email"
                variant="standard"
                value={studentEmail}
                onChange={(e) => {
                  setStudentEmail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
              <InputLabel id="demo-simple-select-label">Department</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="studentDept"
                label="Department"
                value={studentDepartment}
                onChange={(e) => {
                  setStudentDepartment(e.target.value);
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
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="studentYear"
                label="Year"
                value={studentYear}
                onChange={(e) => {
                  setStudentYear(e.target.value);
                }}
              >
                <MenuItem value="first">1st</MenuItem>
                <MenuItem value="second">2nd</MenuItem>
                <MenuItem value="third">3rd</MenuItem>
                <MenuItem value="fourth">4th</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
              <InputLabel id="demo-simple-select-label">Section</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="studentSection"
                label="Section"
                value={studentSection}
                onChange={(e) => {
                  setStudentSection(e.target.value);
                }}
              >
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
                <MenuItem value="C">C</MenuItem>
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
                value={studentGender}
                onChange={(e) => {
                  setStudentGender(e.target.value);
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
                id="studentDob"
                type="date"
                value={studentDob}
                onChange={(e) => setStudentDob(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
              <TextField
                id="studentContactNum"
                label="Contact Number"
                type="number"
                variant="standard"
                value={studentContactNumber}
                onChange={(e) => {
                  setStudentContactNumber(e.target.value);
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
              <TextField
                id="studentFatherName"
                label="Father Name"
                type="text"
                variant="standard"
                value={studentFatherName}
                onChange={(e) => {
                  setStudentFatherName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
              <TextField
                id="studentFatherContactNum"
                label="Father Contact Number"
                type="number"
                variant="standard"
                value={studentFatherContactNumber}
                onChange={(e) => {
                  setStudentFatherContactNumber(e.target.value);
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
              <TextField
                id="aadharNum"
                type="number"
                label="Aadhar Card Number"
                variant="standard"
                value={studentAadharNumber}
                onChange={(e) => setStudentAadharNumber(e.target.value)}
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
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default AddStudent;
