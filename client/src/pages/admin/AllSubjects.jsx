import React, { Fragment, useState, useEffect } from "react";

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
import { useNavigate } from "react-router-dom";

function AllSubjects() {
  const navigate = useNavigate();
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [subjects, setSubjects] = useState({});
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
        "http://localhost:4000/admin/allSubjects",
        { department, year },
        { headers: headers }
      )
      .then((res) => {
        setSubjects(res.data.subjects);
      })
      .catch((err) => {
        window.alert(err.response.data.message);
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
        {subjects === undefined && (
          <Grid item xs={12} md={8}>
            <p style={{ color: "red" }}>No Subjects Found</p>
          </Grid>
        )}
        {subjects !== undefined && subjects.length && (
          <Grid item xs={12} md={8}>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table sx={{ minWidth: 500 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      S.No
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Subject Code
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Name
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Total Lecture
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subjects.map((subject, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">
                        {subject.subjectCode}
                      </TableCell>
                      <TableCell align="center">{subject.name}</TableCell>
                      <TableCell align="center">
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
