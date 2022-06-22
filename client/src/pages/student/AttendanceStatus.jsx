import React, { Fragment, useEffect, useState, useContext } from "react";
import EndPointContext from "../../context/EndPointContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Table,
  TableHead,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import NavbarStudent from "../../components/NavbarStudent";

function AttendanceStatus() {
  const ENDPOINT = useContext(EndPointContext).ENDPOINT;
  const navigate = useNavigate();
  const [results, setResults] = useState({});

  useEffect(() => {
    if (localStorage.getItem("studentToken") === null) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const headers = {
      Authorization: `${localStorage.getItem("studentToken")}`,
    };

    const helper = async () => {
      const res = await axios.get(ENDPOINT + "student/attendanceStatus", {
        headers: headers,
      });
      setResults(res.data.result);
    };
    helper();
  }, [ENDPOINT]);

  return (
    <Fragment>
      <NavbarStudent />
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} md={8}>
          {results !== undefined && results.length ? (
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
                      Maximum Hours
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Present Hours
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Absent Hours
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Total Hours
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Attendance
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((result, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">{result.subjectCode}</TableCell>
                      <TableCell align="center">{result.subjectName}</TableCell>
                      <TableCell align="center">{result.maxHours}</TableCell>
                      <TableCell align="center">
                        {result.maxHours - result.absentHours}
                      </TableCell>
                      <TableCell align="center">{result.absentHours}</TableCell>
                      <TableCell align="center">
                        {result.totalLecture}
                      </TableCell>
                      <TableCell align="center">{result.attendance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <p>Attendance is not uploaded yet</p>
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default AttendanceStatus;
