import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import jwt_decode from "jwt-decode";
import Dashboard from "../../components/Dashboard";
import NavbarFaculty from "../../components/NavbarFaculty";

function FacultyProfile() {
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState({});
  useEffect(() => {
    if (localStorage.getItem("facultyToken") === null) {
      navigate("/");
    }
    setFaculty(jwt_decode(localStorage.getItem("facultyToken")));
  }, [navigate]);
  return (
    <>
      <Grid container direction="column" justifyContent="space-between">
        <Box>
          <NavbarFaculty />
        </Box>
        <Box>
          <Dashboard data={faculty} />
        </Box>
      </Grid>
    </>
  );
}

export default FacultyProfile;
