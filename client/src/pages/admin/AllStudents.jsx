import React, { Fragment, useEffect, useState, useContext } from "react";
import EndPointContext from "../../context/EndPointContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

function AllStudents() {
  const ENDPOINT = useContext(EndPointContext).ENDPOINT;
  const navigate = useNavigate();
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [students, setStudents] = useState({});
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
        ENDPOINT + "admin/allStudents",
        {
          department,
          year,
        },
        { headers: headers }
      )
      .then((res) => {
        setStudents(res.data.students);
      })
      .catch((err) => {
        window.alert(err.response.data.message);
        setDepartment("");
        setYear("");
      });
  };
  return (
    <Fragment>
      <NavbarAdmin />
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={8} md={6}>
          <form onSubmit={submitHandler}>
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
        {students === undefined && (
          <Grid item xs={12} md={8}>
            <p style={{ color: "red" }}>No Students Found</p>
          </Grid>
        )}

        {students !== undefined && students.length && (
          <Grid item xs={12} md={8}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>S.No</TableCell>
                    <TableCell align="center">Registration Number</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Section</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">
                        {student.registrationNumber}
                      </TableCell>
                      <TableCell align="center">{student.name}</TableCell>
                      <TableCell align="center">{student.email}</TableCell>
                      <TableCell align="center">{student.section}</TableCell>
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

export default AllStudents;
