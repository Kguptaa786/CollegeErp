import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
const Links = [
  { keyVal: 1, page: "Add Faculty", path: "/admin/addFaculty" },
  { keyVal: 2, page: "Add Student", path: "/admin/addStudent" },
  { keyVal: 3, page: "Add Subject", path: "/admin/addSubject" },
  { keyVal: 4, page: "Add Admin", path: "/admin/addAdmin" },
  { keyVal: 5, page: "All Faculties", path: "/admin/allFaculties" },
  { keyVal: 6, page: "All Students", path: "/admin/allStudents" },
  { keyVal: 7, page: "All Subjects", path: "/admin/allSubjects" },
  { keyVal: 8, page: "Update Password", path: "/admin/updatePassword" },
];

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
  button: {
    "&.active": {
      textDecoration: "underline",
    },
  },
});

const ResponsiveAppBar = () => {
  const classes = useStyles();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  let navigate = useNavigate();
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

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/admin");
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
            <Link
              to="/admin"
              style={{ textDecoration: "none", color: "white" }}
            >
              CollegeERP
            </Link>
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
                <MenuItem key={Link.keyVal} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <NavLink
                      to={Link.path}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {Link.page}
                    </NavLink>
                  </Typography>
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
            <Link
              to="/admin"
              style={{ textDecoration: "none", color: "white" }}
            >
              CollegeERP
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {Links.map((Link) => (
              <Button
                className={classes.button}
                key={Link.keyVal}
                onClick={() => {
                  navigate(Link.path);
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
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center" onClick={handleProfile}>
                  Profile
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center" onClick={handleLogout}>
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
