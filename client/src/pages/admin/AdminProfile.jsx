import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../components/Dashboard";
import NavbarAdmin from "../../components/NavbarAdmin";

function AdminProfile() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({});
  useEffect(() => {
    if (localStorage.getItem("adminToken") === null) {
      navigate("/adminLogin");
    }
    setAdmin(jwt_decode(localStorage.getItem("adminToken")));
  }, [navigate]);

  return (
    <>
      <Grid container direction="column" justifyContent="space-between">
        <Box>
          <NavbarAdmin />
        </Box>
        <Box>
          <Dashboard data={admin} />
        </Box>
      </Grid>
    </>
  );
}

export default AdminProfile;
