import React from "react";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  active: {
    textDecoration: "underline",
    color: "white",
    textTransform: "uppercase",
    margin: "8px",
  },
  inActive: {
    color: "white",
    textTransform: "uppercase",
    textDecoration: "none",
    margin: "8px",
  },
});

function NavbarFaculty() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          CollegeERP
        </Typography>
        <Typography>
          <NavLink
            to="addFaculty"
            className={(navData) =>
              navData.isActive ? classes.active : classes.inActive
            }
          >
            Add Faculty
          </NavLink>
        </Typography>
        <Typography>
          <NavLink
            to="addStudent"
            className={(navData) =>
              navData.isActive ? classes.active : classes.inActive
            }
          >
            Add Student
          </NavLink>
        </Typography>
        <Typography>
          <NavLink
            to="addSubject"
            className={(navData) =>
              navData.isActive ? classes.active : classes.inActive
            }
          >
            Add Subject
          </NavLink>
        </Typography>
        <Typography>
          <NavLink
            to="addAdmin"
            className={(navData) =>
              navData.isActive ? classes.active : classes.inActive
            }
          >
            Add Admin
          </NavLink>
        </Typography>
        <Typography>
          <NavLink
            to="ourFaculties"
            className={(navData) =>
              navData.isActive ? classes.active : classes.inActive
            }
          >
            Our Faculties
          </NavLink>
        </Typography>
        <Typography>
          <NavLink
            to="ourStudents"
            className={(navData) =>
              navData.isActive ? classes.active : classes.inActive
            }
          >
            Our Students
          </NavLink>
        </Typography>
        <Typography>
          <NavLink
            to=""
            className={(navData) =>
              navData.isActive ? classes.active : classes.inActive
            }
          >
            Logout
          </NavLink>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default NavbarFaculty;
