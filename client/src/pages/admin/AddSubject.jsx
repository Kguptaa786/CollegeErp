import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Button,
  MenuItem,
  FormLabel,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import NavbarAdmin from "../../components/NavbarAdmin";
import { useNavigate } from "react-router-dom";

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
});

function AddSubject() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [name, setName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [department, setDepartment] = useState("");
  const [totalLectures, setTotalLectures] = useState("");
  const [year, setYear] = useState("");
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
        "http://localhost:4000/admin/addSubject",
        {
          name,
          subjectCode,
          department,
          totalLectures,
          year,
        },
        { headers: headers }
      )
      .then((res) => {
        window.alert(res.data.message);
        setName("");
        setSubjectCode("");
        setDepartment("");
        setTotalLectures("");
        setYear("");
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
              <TextField
                id="standard-basic"
                label=" Name"
                variant="standard"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
              <TextField
                id="standard-basic"
                label=" Code"
                variant="standard"
                value={subjectCode}
                onChange={(e) => {
                  setSubjectCode(e.target.value);
                }}
              />
            </FormControl>
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
              <FormLabel id="demo-row-radio-buttons-group-label">
                Total Lecture
              </FormLabel>
              <TextField
                id="total-lecture"
                type="number"
                value={totalLectures}
                onChange={(e) => setTotalLectures(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="Year"
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
      </Grid>
    </Fragment>
  );
}

export default AddSubject;
