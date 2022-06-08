import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
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
import NavbarStudent from "../../components/NavbarStudent";

function SubjectList() {
  const navigate = useNavigate();
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [subjects, setSubjects] = useState({});

  useEffect(() => {
    if (localStorage.getItem("studentToken") === null) {
      navigate("/");
    }
    setYear(jwt_decode(localStorage.getItem("studentToken")).year);
    setDepartment(jwt_decode(localStorage.getItem("studentToken")).department);
    axios
      .get("http://localhost:4000/student/subjectList", {
        params: {
          department,
          year,
        },
      })
      .then((res) => {
        setSubjects(res.data.subjects);
      })
      .catch((err) => {
        console.log(err);
        window.alert("No Student Found");
      });
  }, [navigate, department, year]);

  return (
    <Fragment>
      <NavbarStudent />
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} md={8}>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    S.No
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Subject Code
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Subject Name
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Year
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Total Lectures
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {subjects.length &&
                  subjects.map((subject, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">
                        {subject.subjectCode}
                      </TableCell>
                      <TableCell align="center">{subject.name}</TableCell>
                      <TableCell align="center">{subject.year}</TableCell>
                      <TableCell align="center">
                        {subject.totalLectures}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default SubjectList;
