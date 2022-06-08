import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  FormControl,
  TextField,
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

function MarkAttendance() {
  const navigate = useNavigate();
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [totalMark, setTotalMark] = useState("");
  const [section, setSection] = useState();
  const [subjectId, setSubjectId] = useState("");
  const [exam, setExam] = useState("");
  const [students, setStudents] = useState({});
  const [allSubjectCode, setAllSubjectCode] = useState({});
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("facultyToken") === null) {
      navigate("/");
    }
  }, [navigate]);

  const markChangeHandler = (value, _id) => {
    const newMarks = [...marks];
    let index = newMarks.findIndex((m) => m._id === _id);
    if (index === -1) {
      newMarks.push({ _id, value });
    } else {
      newMarks[index].value = value;
    }
    setMarks(newMarks);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:4000/faculty/uploadMarks", {
        department,
        year,
        section,
      })
      .then((res) => {
        setStudents(res.data.data);
        setAllSubjectCode(res.data.allSubjectCode);
      })
      .catch((err) => console.log(err.message));
  };
  const secondSubmitHandler = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:4000/faculty/uploadMarksHelper", {
        department,
        year,
        section,
        subjectId,
        exam,
        marks,
        totalMark,
      })
      .then((res) => {
        // if (res.data.status === 400) {
        //   window.alert(res.data.message);
        // }
        // if (res.data.status === 200) {

        // }
        window.alert(res.data.message);
        navigate("/faculty");
      })
      .catch((err) => console.log("jhjhkgj"));
  };
  return (
    <Fragment>
      <NavbarFaculty />

      <Grid container alignItems="center" justifyContent="center">
        {!students.length && (
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
        {students.length && (
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
              <FormControl fullWidth sx={{ m: 2 }}>
                <InputLabel id="demo-simple-select-label">Exam</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Exam"
                  value={exam}
                  onChange={(e) => {
                    setExam(e.target.value);
                  }}
                >
                  <MenuItem value="test1">Test 1</MenuItem>
                  <MenuItem value="test2">Test 2</MenuItem>
                  <MenuItem value="test3">Test 3</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ m: 2 }}>
                <TextField
                  id="standard-basic"
                  label="Total Mark"
                  variant="standard"
                  type="number"
                  value={totalMark}
                  onChange={(e) => setTotalMark(e.target.value)}
                />
              </FormControl>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        S.No
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Registration Number
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Name
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Marks Obtained
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
                          {student.registrationNumber.slice(9)}
                        </TableCell>
                        <TableCell align="center">
                          {student.registrationNumber}
                        </TableCell>
                        <TableCell align="center">{student.name}</TableCell>
                        <TableCell align="center">
                          <input
                            type="number"
                            required
                            onChange={(e) =>
                              markChangeHandler(e.target.value, student._id)
                            }
                          />
                        </TableCell>
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
