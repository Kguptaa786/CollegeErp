import React, { Fragment, useState, useEffect, useContext } from "react";
import EndPointContext from "../../context/EndPointContext";
import axios from "axios";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  Button,
  MenuItem,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Paper,
  TableBody,
} from "@mui/material";

import NavbarFaculty from "../../components/NavbarFaculty";
import { useNavigate } from "react-router-dom";

function MarkAttendance() {
  const ENDPOINT = useContext(EndPointContext).ENDPOINT;
  const navigate = useNavigate();
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [section, setSection] = useState();
  const [subjectId, setSubjectId] = useState("");
  const [students, setStudents] = useState({});
  const [allSubjectCode, setAllSubjectCode] = useState({});
  const [checkedValue, setCheckedValue] = useState([]);
  const [facultyToken, setFacultyToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("facultyToken") === null) {
      navigate("/");
    }
    setFacultyToken(localStorage.getItem("facultyToken"));
  }, [navigate]);

  const checkChangeHandler = (event) => {
    const temp = checkedValue;
    if (event.target.checked) {
      temp.push(event.target.value);
    } else {
      const index = temp.indexOf(event.target.value);
      temp.splice(index, 1);
    }
    setCheckedValue(temp);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    const headers = {
      Authorization: `${facultyToken}`,
    };
    await axios
      .post(
        ENDPOINT + "faculty/markAttendance",
        {
          department,
          year,
          section,
        },
        { headers: headers }
      )
      .then((res) => {
        setStudents(res.data.students);
        setAllSubjectCode(res.data.allSubjectCode);
      })
      .catch((err) => {
        console.log(err);
        window.alert("All field required");
      });
  };

  const secondSubmitHandler = async (event) => {
    event.preventDefault();
    await axios
      .post(ENDPOINT + "faculty/markAttendanceHelper", {
        department,
        year,
        section,
        subjectId,
        checkedValue,
      })
      .then((res) => {
        window.alert(res.data.message);
        navigate("/faculty");
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      });
  };
  return (
    <Fragment>
      <NavbarFaculty />
      <Grid container alignItems="center" justifyContent="center">
        {students.length === undefined && !students.length && (
          <Grid item xs={12} md={6}>
            <form onSubmit={submitHandler}>
              <FormControl fullWidth sx={{ m: 2 }}>
                <InputLabel id="demo-simple-select-label">
                  Department
                </InputLabel>
                <Select
                  defaultValue=""
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
                  defaultValue=""
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
                  defaultValue=""
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
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
        {students !== undefined && students.length && (
          <Grid item xs={12} md={8}>
            <form onSubmit={secondSubmitHandler}>
              <FormControl fullWidth sx={{ m: 2 }}>
                <InputLabel id="demo-simple-select-label">
                  Subject Code
                </InputLabel>
                <Select
                  defaultValue=""
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Subject Code"
                  value={subjectId}
                  onChange={(e) => {
                    setSubjectId(e.target.value);
                  }}
                >
                  {allSubjectCode.map((ele) => (
                    <MenuItem value={ele._id}>{ele.subjectCode}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Mark Attendance
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        S.No
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Registration Number
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Name
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow
                        key={student._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">
                          <input
                            type="checkbox"
                            value={student._id}
                            onChange={checkChangeHandler}
                          />
                        </TableCell>
                        <TableCell align="center">
                          {student.registrationNumber.slice(9)}
                        </TableCell>
                        <TableCell align="center">
                          {student.registrationNumber}
                        </TableCell>
                        <TableCell align="center">{student.name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
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
      </Grid>
    </Fragment>
  );
}

export default MarkAttendance;
