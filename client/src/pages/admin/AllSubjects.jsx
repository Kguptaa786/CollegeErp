import React, { Fragment, useState } from "react";
import axios from "axios";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  Button,
  MenuItem,
  Paper,
  Table,
  TableHead,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import NavbarAdmin from "../../components/NavbarAdmin";

function AllSubjects() {
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [subjects, setSubjects] = useState({});
  const submitHandler = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:4000/admin/allSubjects", { department, year })
      .then((res) => {
        if (res.data.status === 404) {
          // window.alert(res.data.error);
          console.log("sdfgh");
        } else {
          setSubjects(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Fragment>
      <NavbarAdmin />
      <Grid container alignItems="center" justifyContent="center">
        {!subjects.length && (
          <Grid item xs={12} md={6}>
            <form onSubmit={submitHandler}>
              <FormControl fullWidth sx={{ m: 2 }}>
                <InputLabel id="demo-simple-select-label">
                  Department
                </InputLabel>
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
                  <MenuItem value="CSE">
                    COMPUTER SCIENCE & ENGINEERING
                  </MenuItem>
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
                  value={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                >
                  <MenuItem value="first">1st</MenuItem>
                  <MenuItem value="second">2nd</MenuItem>
                  <MenuItem value="third">3rd</MenuItem>
                  <MenuItem value="fourth">4th</MenuItem>
                </Select>
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
        )}
        {subjects.length && (
          <Grid item xs={12} md={8}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Subject Code</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Total Lecture</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subjects.map((subject) => (
                    <TableRow
                      key={subject._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="right">{subject.subjectCode}</TableCell>
                      <TableCell align="right">{subject.name}</TableCell>
                      <TableCell align="right">
                        {subject.totalLectures}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}
      </Grid>
    </Fragment>
  );
}

export default AllSubjects;
