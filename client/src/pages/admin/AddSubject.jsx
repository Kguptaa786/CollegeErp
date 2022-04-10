import React, { Fragment, useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Button,
  MenuItem,
  FormLabel,
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

function AddStudent() {
  const classes = useStyles();
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectDepartment, setSubjectDepartment] = useState("");
  const [subjectTotalLecture, setSubjectTotalLecture] = useState("");
  const [subjectYear, setSubjectYear] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
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
                label="Subject Name"
                variant="standard"
                value={subjectName}
                onChange={(e) => {
                  setSubjectName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
              <TextField
                id="standard-basic"
                label="Subject Code"
                type="number"
                variant="standard"
                value={subjectCode}
                onChange={(e) => {
                  setSubjectCode(e.target.value);
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
              <InputLabel id="demo-simple-select-label">Department</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Department"
                value={subjectDepartment}
                onChange={(e) => {
                  setSubjectDepartment(e.target.value);
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
              <FormLabel id="demo-row-radio-buttons-group-label">
                Total Lecture
              </FormLabel>
              <TextField
                id="total-lecture"
                type="number"
                value={subjectTotalLecture}
                onChange={setSubjectTotalLecture}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
              <TextField
                id="standard-basic"
                label="Year"
                variant="standard"
                value={subjectYear}
                onChange={(e) => {
                  setSubjectYear(e.target.value);
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
    </Fragment>
  );
}

export default AddStudent;
