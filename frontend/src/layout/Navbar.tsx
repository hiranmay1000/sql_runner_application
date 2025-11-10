import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import type { NavbarPorpsType } from "./types";
import { APP_DETAILS } from "../config/constant";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  Avatar,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
} from "@mui/material";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { logout } from "../redux/slice/userAuth.slice";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

export default function Navbar(props: NavbarPorpsType) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showLoginModal, setShowLoginModal] = React.useState<boolean>(false);
  const [showSignupModal, setShowSignupModal] = React.useState<boolean>(false);

  const { setSidebarOpen } = props;
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#0067a3ca", backdropFilter: "blur(5px)" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              setSidebarOpen((prev) => !prev);
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {APP_DETAILS.name}
          </Typography>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar /> Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>

          {user ? (
            <Tooltip title="Account settings">
              <Stack
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  backgroundColor: "#13557bff",
                  borderRadius: 2,
                  boxShadow: 3,
                  "&:hover": {
                    backgroundColor: "#0d4e74ff",
                    cursor: "pointer",
                  },
                }}
              >
                <MenuItem onClick={handleClick}>
                  <Avatar sx={{ width: 24, height: 24 }} />
                  <Typography fontWeight={"bold"} ml={1}>
                    {user.firstname + " " + user.lastname || "User"}
                  </Typography>
                </MenuItem>
              </Stack>
            </Tooltip>
          ) : (
            <Button
              variant="contained"
              sx={{
                bgcolor: "#5bb9f0b0",
                ":hover": { bgcolor: "#9dd5f3ff" },
                py: 1.2,
                borderRadius: 2,
              }}
              onClick={() => setShowLoginModal(true)}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {showLoginModal && (
        <Login
          onClose={() => setShowLoginModal(false)}
          setShowSignupModal={setShowSignupModal}
          setShowLoginModal={setShowLoginModal}
        />
      )}
      {showSignupModal && (
        <Signup
          onClose={() => setShowSignupModal(false)}
          setShowSignupModal={setShowSignupModal}
          setShowLoginModal={setShowLoginModal}
        />
      )}
    </Box>
  );
}
