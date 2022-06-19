import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
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

function TestPerformance() {
  const navigate = useNavigate();
  const [results, setResults] = useState({});
  const [test1, setTest1] = useState({});
  const [test2, setTest2] = useState({});
  const [test3, setTest3] = useState({});

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
      const res = await axios.get(
        "http://localhost:4000/student/testPerformance",
        {
          headers: headers,
        }
      );
      setResults(res.data.result);
      setTest1(res.data.result.test1);
      setTest2(res.data.result.test2);
      setTest3(res.data.result.test3);
    };
    helper();
  }, []);
  return (
    <Fragment>
      <NavbarStudent />
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} md={8}>
          {(results === undefined || results.length === 0) && (
            <h2>No Mark Uploaded</h2>
          )}
          {test1 !== undefined && test1.length && (
            <>
              <h3>TEST1</h3>
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
                        Obtained Marks
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Total Marks
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Percentage
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {test1.map((payload, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center" component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell align="center">
                          {payload.subject.subjectCode}
                        </TableCell>
                        <TableCell align="center">
                          {payload.subject.name}
                        </TableCell>
                        <TableCell align="center">{payload.mark}</TableCell>
                        <TableCell align="center">
                          {payload.totalMark}
                        </TableCell>
                        <TableCell align="center">
                          {(payload.mark * 100) / payload.totalMark} %
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
          {test2 !== undefined && test2.length && (
            <>
              <h3>TEST2</h3>
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
                        Obtained Marks
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Total Marks
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Percentage
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {test2.map((payload, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center" component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell align="center">
                          {payload.subject.subjectCode}
                        </TableCell>
                        <TableCell align="center">
                          {payload.subject.name}
                        </TableCell>
                        <TableCell align="center">{payload.mark}</TableCell>
                        <TableCell align="center">
                          {payload.totalMark}
                        </TableCell>
                        <TableCell align="center">
                          {(payload.mark * 100) / payload.totalMark} %
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
          {test3 !== undefined && test3.length && (
            <>
              <h3>TEST3</h3>
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
                        Obtained Marks
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Total Marks
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Percentage
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {test3.map((payload, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center" component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell align="center">
                          {payload.subject.subjectCode}
                        </TableCell>
                        <TableCell align="center">
                          {payload.subject.name}
                        </TableCell>
                        <TableCell align="center">{payload.mark}</TableCell>
                        <TableCell align="center">
                          {payload.totalMark}
                        </TableCell>
                        <TableCell align="center">
                          {(payload.mark * 100) / payload.totalMark} %
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default TestPerformance;
