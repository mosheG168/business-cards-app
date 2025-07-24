import { useState } from "react";
import {
  AppBar, Toolbar, Button, Typography, IconButton, Drawer, Box,
  List, ListItem, ListItemText, Avatar, TextField, Menu,
  MenuItem, CircularProgress, InputAdornment, Tooltip
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeMode } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";
import SearchIcon from "@mui/icons-material/Search";
import "../../styles/Header.css";

const Header = () => {
  const { mode, toggleColorMode } = useThemeMode();
  const { user, ready, logout } = useUser();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation(); 

  const handleLogoutClick = () => {
    setAnchorEl(null);
    logout();
    navigate("/login");
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    navigate(`/cards?search=${encodeURIComponent(value)}`, { replace: pathname === "/cards" });
  };

  if (!ready) {
    return (
      <AppBar className="app-header" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar sx={{ justifyContent: "center" }}>
          <CircularProgress color="inherit" />
        </Toolbar>
      </AppBar>
    );
  }

  const navLinks = [
    { label: "Home", path: "" },
    { label: "About", path: "about" },
    ...(user
      ? [
          ...(user.isAdmin ? [{ label: "Admin", path: "/admin" }] : []),
          ...(user.isBusiness ? [{ label: "Create Card", path: "/create-card" }] : []),
          { label: "My Cards", path: "/my-cards" },
          { label: "Favorites", path: "/favorites" },
        ]
      : [
          { label: "Login", path: "/login" },
          { label: "Register", path: "/register" },
        ]),
  ];

  const userIcon = user?.isAdmin ? <AdminPanelSettingsIcon /> :
                   user?.isBusiness ? <BusinessCenterIcon /> :
                   <PersonOutlineIcon />;

  const userTooltip = user?.isAdmin ? "Admin User" :
                      user?.isBusiness ? "Business User" :
                      "Regular User";

  return (
    <>
      <AppBar className="app-header" sx={{ backgroundColor: mode === "dark" ? "#121212" : "#1976d2" }}>
        <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
          <IconButton sx={{ display: { xs: "flex", sm: "none" }, color: "inherit" }} onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h5"
            sx={{
              mr: 2,
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
              fontSize: "1.6rem",
              fontFamily: "Roboto, sans-serif",
              letterSpacing: 1,
            }}
          >
            BCards
          </Typography>
          <Typography
            variant="h6"
            className="app-title"
          >
            Business Cards App
          </Typography>

          <TextField className="search-field"
            size="small"
            placeholder="Search cards..."
            variant="outlined"
            sx={{
              backgroundColor: mode === "dark" ? "#2c2c2c" : "white",
              color: mode === "dark" ? "#e0e0e0" : "#000",
              borderRadius: 1,
              minWidth: 200,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: mode === "dark" ? "#555" : "#ccc" },
                "&:hover fieldset": { borderColor: mode === "dark" ? "#90caf9" : "#1976d2" },
              },
            }}
            value={searchText}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: mode === "dark" ? "#90caf9" : "#555" }} />
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2, alignItems: "center" }}>
            <IconButton onClick={toggleColorMode} color="inherit">
              {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            {navLinks.map((link) => (
              <Button
                key={link.path}
                color="inherit"
                component={Link}
                to={link.path}
                sx={{
                  borderBottom: pathname === link.path ? "2px solid white" : "2px solid transparent",
                  borderRadius: 0,
                  "&:hover": { borderBottom: "2px solid white" },
                  transition: "border-bottom 0.2s ease",
                }}
              >
                {link.label}
              </Button>
            ))}

            {user && (
              <>
                <Tooltip title={userTooltip}>
                  <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                    <Avatar sx={{ bgcolor: "white", color: "#1976d2" }}>{userIcon}</Avatar>
                  </IconButton>
                </Tooltip>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                  <MenuItem onClick={() => navigate("/edit-profile")}>Edit Profile</MenuItem>
                  <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250, display: "flex", flexDirection: "column", height: "100%" }} role="presentation" onClick={() => setDrawerOpen(false)}>
          <List>
            {navLinks.map((link) => (
              <ListItem button key={link.path} component={Link} to={link.path}>
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
          </List>
          {user && (
            <List sx={{ mt: "auto" }}>
              <ListItem button component={Link} to="/edit-profile"><ListItemText primary="Edit Profile" /></ListItem>
              <ListItem button onClick={handleLogoutClick}><ListItemText primary="Logout" /></ListItem>
            </List>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
