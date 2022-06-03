import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Grid, Box } from "@mui/material";

import Dashboard from "../../components/Dashboard";
import NavbarStudent from "../../components/NavbarStudent";

function StudentProfile() {
  const navigate = useNavigate();
  const [student, setstudent] = useState({});
  useEffect(() => {
    if (localStorage.getItem("studentToken") === null) {
      navigate("/");
    }
    setstudent(jwt_decode(localStorage.getItem("studentToken")));
  }, [navigate]);
  return (
    <>
      <Grid container direction="column" justifyContent="space-between">
        <Box>
          <NavbarStudent />
        </Box>
        <Box>
          <Dashboard data={student} />
        </Box>
      </Grid>
    </>
  );
}

export default StudentProfile;
