import React, { Fragment, useState } from "react";
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

function AddStudent() {
  const classes = useStyles();
  // const store = useSelector((store) => store);
  const dispatch = useDispatch();
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
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    // setIsLoading(true);
    dispatch(
      addStudent({
        studentName,
        studentEmail,
        studentYear,
        studentDepartment,
        studentFatherName,
        studentAadharNumber,
        studentDob,
        studentGender,
        studentSection,
        studentContactNumber,
        studentFatherContactNumber,
      })
    );
  };

  return (
    <Fragment>
      <NavbarAdmin />
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} md={6}>
          <form onSubmit={submitHandler}>
            <FormControl fullWidth sx={{ m: 2 }}>
              <TextField
                id="standard-basic"
                label="Name"
                variant="standard"
                value={studentName}
                onChange={(e) => {
                  setStudentName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
              <TextField
                id="standard-basic"
                label="Email"
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
                id="demo-simple-select"
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
                id="demo-simple-select"
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
                id="demo-simple-select"
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
                id="date"
                type="date"
                value={studentDob}
                onChange={setStudentDob}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
              <TextField
                id="standard-basic"
                label="Contact Number"
                variant="standard"
                value={studentContactNumber}
                onChange={(e) => {
                  setStudentContactNumber(e.target.value);
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
              <TextField
                id="standard-basic"
                label="Father Name"
                variant="standard"
                value={studentFatherName}
                onChange={(e) => {
                  setStudentFatherName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
              <TextField
                id="standard-basic"
                label="Father Contact Number"
                variant="standard"
                value={studentFatherContactNumber}
                onChange={(e) => {
                  setStudentFatherContactNumber(e.target.value);
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
              <TextField
                id="standard-basic"
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
          </form>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default AddStudent;
