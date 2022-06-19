import React, { Fragment, useEffect, useState, useContext } from "react";
import axios from "axios";
import EndPointContext from "../../context/EndPointContext";
import { useNavigate, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
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
import NavbarStudent from "../../components/NavbarStudent";

function Students() {
  const ENDPOINT = useContext(EndPointContext).ENDPOINT;
  const navigate = useNavigate();
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [currRegistrationNumber, setCurrRegistrationNumber] = useState("");
  const [section, setSection] = useState("");
  const [students, setStudents] = useState({});
  const [studentToken, setStudentToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("studentToken") === null) {
      navigate("/");
    }
    setStudentToken(localStorage.getItem("studentToken"));
    setCurrRegistrationNumber(
      jwt_decode(localStorage.getItem("studentToken")).registrationNumber
    );
  }, [navigate]);

  const submitHandler = async (event) => {
    event.preventDefault();
    const headers = {
      Authorization: `${studentToken}`,
    };
    await axios
      .post(
        ENDPOINT + "student/students",
        {
          currRegistrationNumber,
          department,
          year,
          section,
        },
        { headers: headers }
      )
      .then((res) => {
        // console.log(res.data.students);
        setStudents(res.data.students);
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      });
    setDepartment("");
    setYear("");
    setSection("");
  };
  return (
    <Fragment>
      <NavbarStudent />
      <Grid container alignItems="center" justifyContent="center">
        {!students.length && (
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
              <FormControl fullWidth sx={{ m: 2 }}>
                <InputLabel id="demo-simple-select-label">Section</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="Section"
                  label="Section"
                  value={section}
                  onChange={(e) => {
                    setSection(e.target.value);
                  }}
                >
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="C">C</MenuItem>
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
        {students.length && (
          <Grid item xs={12} md={8}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>S.No</TableCell>
                    <TableCell align="center">Registration Number</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Chat</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student) => (
                    <TableRow
                      key={student._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {student.registrationNumber.slice(9)}
                      </TableCell>
                      <TableCell align="center">
                        {student.registrationNumber}
                      </TableCell>
                      <TableCell align="center">{student.name}</TableCell>
                      <TableCell align="center">
                        <Link to={`/student/${student.registrationNumber}`}>
                          Explore
                        </Link>{" "}
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

export default Students;
