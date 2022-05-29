import { Grid, Box } from "@mui/material";
import React, { Fragment } from "react";
import Dashboard from "../../components/Dashboard";
import NavbarFaculty from "../../components/NavbarFaculty";

function FacultyProfile() {
  return (
    <>
      <Grid container direction="column" justifyContent="space-between">
        <Box>
          <NavbarFaculty />
        </Box>
        <Box>
          <Dashboard />
        </Box>
      </Grid>
    </>
  );
}

export default FacultyProfile;
