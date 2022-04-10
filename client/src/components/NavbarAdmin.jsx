// import React from "react";
// import { AppBar, Container, Toolbar, Typography } from "@mui/material";
// import { NavLink } from "react-router-dom";
// import { makeStyles } from "@mui/styles";

// const useStyles = makeStyles({
//   root: {},
//   active: {
//     textDecoration: "underline",
//     color: "white",
//     textTransform: "uppercase",
//     marginBottom: "px",
//   },
//   inActive: {
//     color: "white",
//     textTransform: "uppercase",
//     textDecoration: "none",
//     margin: "8px",
//   },
// });

// function NavbarAdmin() {
//   const classes = useStyles();

//   return (
//     <AppBar position="absolute" className={}>
//       <Toolbar>
//         <Typography variant="h6" style={{ flexGrow: 1 }}>
//           CollegeERP
//         </Typography>
//         <Typography>
//           <NavLink
//             to="../admin/addFaculty"
//             className={(navData) =>
//               navData.isActive ? classes.active : classes.inActive
//             }
//           >
//             Add Faculty
//           </NavLink>
//         </Typography>
//         <Typography>
//           <NavLink
//             to="../admin/addStudent"
//             className={(navData) =>
//               navData.isActive ? classes.active : classes.inActive
//             }
//           >
//             Add Student
//           </NavLink>
//         </Typography>
//         <Typography>
//           <NavLink
//             to="../admin/addSubject"
//             className={(navData) =>
//               navData.isActive ? classes.active : classes.inActive
//             }
//           >
//             Add Subject
//           </NavLink>
//         </Typography>
//         <Typography>
//           <NavLink
//             to="../admin/addAdmin"
//             className={(navData) =>
//               navData.isActive ? classes.active : classes.inActive
//             }
//           >
//             Add Admin
//           </NavLink>
//         </Typography>
//         <Typography>
//           <NavLink
//             to="../admin/ourFaculties"
//             className={(navData) =>
//               navData.isActive ? classes.active : classes.inActive
//             }
//           >
//             Our Faculties
//           </NavLink>
//         </Typography>
//         <Typography>
//           <NavLink
//             to="../admin/ourStudents"
//             className={(navData) =>
//               navData.isActive ? classes.active : classes.inActive
//             }
//           >
//             Our Students
//           </NavLink>
//         </Typography>
//         <Typography>
//           <NavLink
//             to="../admin/"
//             className={(navData) =>
//               navData.isActive ? classes.active : classes.inActive
//             }
//           >
//             Logout
//           </NavLink>
//         </Typography>
//       </Toolbar>
//     </AppBar>
//   );
// }

// export default NavbarAdmin;

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

const Links = [
  { page: "Add Faculty", path: "/admin/addFaculty" },
  { page: "Add Student", path: "/admin/addStudent" },
  { page: "Add Subject", path: "/admin/addSubject" },
  { page: "All Faculties", path: "/admin/allFaculties" },
  { page: "All Students", path: "/admin/allStudents" },
  { page: "All Subjects", path: "/admin/allSubjects" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  let router = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            CollegeERP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {Links.map((Link) => (
                <MenuItem key={"1"} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{Link.page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {Links.map((Link) => (
              <Button
                key={"1"}
                onClick={() => {
                  router(Link.path);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {Link.page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
