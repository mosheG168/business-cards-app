import { useState, useEffect } from "react";
import {
  AppBar, Toolbar, Button, Typography, IconButton, Drawer, Box,
  List, ListItem, ListItemText, Avatar, TextField, Menu,
  MenuItem, CircularProgress, InputAdornment, Tooltip
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  PersonOutline as PersonOutlineIcon,
  BusinessCenter as BusinessCenterIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  Menu as MenuIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  Search as SearchIcon,
  Close as CloseIcon
} from "@mui/icons-material";
import { useThemeMode } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";
import "../../styles/Header.css";

// Custom hook to detect mobile
const useIsMobile = (width = 600) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= width);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= width);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [width]);
  return isMobile;
};

const Header = () => {
  const { mode, toggleColorMode } = useThemeMode();
  const { user, ready, logout } = useUser();
  const isMobile = useIsMobile(600);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
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
      <AppBar className="app-header">
        <Toolbar className="loading-toolbar">
          <CircularProgress color="inherit" />
        </Toolbar>
      </AppBar>
    );
  }

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
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
                      user?.isBusiness ? "Business User" : "Regular User";

  return (
    <>
      <AppBar className="app-header" sx={{ backgroundColor: mode === "dark" ? "#121212" : "#1976d2" }}>
        <Toolbar className="app-toolbar">
          {/* Mobile menu button */}
          {isMobile && (
            <IconButton onClick={() => setDrawerOpen(true)} color="inherit">
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h5" className="app-title">BCards</Typography>

          {/* Desktop search field */}
          {!isMobile && (
            <TextField
              className="search-field"
              size="small"
              placeholder="Search cards..."
              variant="outlined"
              value={searchText}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className="search-icon" />
                  </InputAdornment>
                ),
              }}
            />
          )}

          {/* Mobile search toggle */}
          {isMobile && (
            <IconButton onClick={() => setMobileSearchOpen(!mobileSearchOpen)} color="inherit">
              {mobileSearchOpen ? <CloseIcon /> : <SearchIcon />}
            </IconButton>
          )}

          {/* Navigation links (desktop only) */}
          {!isMobile && (
            <Box className="nav-links">
              <IconButton onClick={toggleColorMode} color="inherit">
                {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              {navLinks.map((link) => (
                <Button
                  key={link.path}
                  color="inherit"
                  component={Link}
                  to={link.path}
                  className={pathname === link.path ? "active-link" : ""}
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
          )}
        </Toolbar>

        {/* Mobile search bar */}
        {isMobile && mobileSearchOpen && (
          <Box className="mobile-search-box open">
            <TextField
              fullWidth
              size="small"
              placeholder="Search cards..."
              variant="outlined"
              value={searchText}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className="search-icon" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        )}
      </AppBar>

      {/* Mobile drawer */}
      {isMobile && (
        <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box sx={{ width: 250 }} role="presentation" onClick={() => setDrawerOpen(false)}>
            <List>
              {navLinks.map((link) => (
                <ListItem button key={link.path} component={Link} to={link.path}>
                  <ListItemText primary={link.label} />
                </ListItem>
              ))}
              {user && (
                <>
                  <ListItem button component={Link} to="/edit-profile">
                    <ListItemText primary="Edit Profile" />
                  </ListItem>
                  <ListItem button onClick={handleLogoutClick}>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </>
              )}
            </List>
          </Box>
        </Drawer>
      )}
    </>
  );
};

export default Header;
