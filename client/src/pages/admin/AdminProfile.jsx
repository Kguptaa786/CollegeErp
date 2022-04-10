import { Grid, Box } from "@mui/material";
import React, { Fragment } from "react";
import Dashboard from "../../components/Dashboard";
import NavbarAdmin from "../../components/NavbarAdmin";

function AdminProfile() {
  return (
    <>
      <Grid container direction="column" justifyContent="space-between">
        <Box>
          <NavbarAdmin />
        </Box>
        <Box>
          <Dashboard />
        </Box>
      </Grid>
    </>
  );
}

export default AdminProfile;
