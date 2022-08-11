import { useState, useContext } from "react";
import EndPointContext from "../context/EndPointContext";
import axios from "axios";
import { useNavigate, Link, NavLink } from "react-router-dom";
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
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
const Links = [
  { keyVal: 1, page: "Test Performance", path: "/student/testPerformance" },
  { keyVal: 2, page: "Subject List", path: "/student/subjectList" },
  { keyVal: 3, page: "Attendance Status", path: "/student/attendanceStatus" },
  { keyVal: 4, page: "Students", path: "/student/students" },
  { keyVal: 5, page: "Update Password", path: "/student/updatePassword" },
  { keyVal: 6, page: "Conversation", path: "/student/conversation" },
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
  const navigate = useNavigate();
  const [len, setLen] = useState(0);
  const classes = useStyles();

  const ENDPOINT = useContext(EndPointContext).ENDPOINT;

  useEffect(() => {
    if (localStorage.getItem("studentToken") === null) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const headers = {
      Authorization: `${localStorage.getItem("studentToken")}`,
    };

    const helper = async () => {
      const res = await axios.get(ENDPOINT + "student/conversation", {
        headers: headers,
      });
      setLen(res.data.conversations.length);
    };
    helper();
    console.log(len);
  }, [ENDPOINT, len]);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
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

  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/student");
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
              to="/student"
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
                      {Link.page === "Conversation"
                        ? Link.page + " (" + len.toString() + ")"
                        : Link.page}
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
              to="/student"
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
                  router(Link.path);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {Link.page === "Conversation"
                  ? Link.page + " (" + len.toString() + ")"
                  : Link.page}
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
