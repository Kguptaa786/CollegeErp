import React, { Fragment, useEffect, useState, useContext } from "react";
import EndPointContext from "../../context/EndPointContext";
import { useNavigate } from "react-router-dom";
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

import { makeStyles } from "@mui/styles";

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
  tableHeaderStyle: {
    align: "center",
    fontWeight: "bold",
    color: "blue",
  },
});

function AllFaculties() {
  const ENDPOINT = useContext(EndPointContext).ENDPOINT;
  const navigate = useNavigate();
  const classes = useStyles();
  const [department, setDepartment] = useState("");
  const [faculties, setFaculties] = useState({});
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
        ENDPOINT + "admin/allFaculties",
        { department },
        { headers: headers }
      )
      .then((res) => {
        setFaculties(res.data.faculties);
      })
      .catch((err) => {
        window.alert(err.response.data.message);
        setDepartment("");
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

        {faculties === undefined && (
          <Grid item xs={12} md={8}>
            <p style={{ color: "red" }}>No Faculties Found</p>
          </Grid>
        )}
        {faculties !== undefined && faculties.length && (
          <Grid item xs={12} md={8}>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
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
                      Email
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Joining Year
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {faculties.map((faculty, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">
                        {faculty.registrationNumber}
                      </TableCell>
                      <TableCell align="center">{faculty.name}</TableCell>
                      <TableCell align="center">{faculty.email}</TableCell>
                      <TableCell align="center">
                        {faculty.joiningYear}
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

export default AllFaculties;
