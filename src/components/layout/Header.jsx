import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Box,
  Avatar,
  TextField,
  Menu,
  MenuItem,
  CircularProgress,
  InputAdornment,
  Tooltip,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  PersonOutline as PersonOutlineIcon,
  BusinessCenter as BusinessCenterIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  Search as SearchIcon,
  Clear as ClearIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useThemeMode } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";
import "../../styles/Header.css";

const Header = () => {
  const { mode, toggleColorMode } = useThemeMode();
  const { user, ready, logout } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    if (value.trim() === "") {
      navigate("/");
    } else {
      navigate(`/cards?search=${encodeURIComponent(value)}`, {
        replace: pathname === "/cards",
      });
    }
  };

  const clearSearch = () => {
    setSearchText("");
    navigate("/");
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
          ...(user.isBusiness
            ? [{ label: "Create Card", path: "/create-card" }]
            : []),
          { label: "My Cards", path: "/my-cards" },
          { label: "Favorites", path: "/favorites" },
        ]
      : [
          { label: "Login", path: "/login" },
          { label: "Register", path: "/register" },
        ]),
  ];

  const userIcon = user?.isAdmin ? (
    <AdminPanelSettingsIcon />
  ) : user?.isBusiness ? (
    <BusinessCenterIcon />
  ) : (
    <PersonOutlineIcon />
  );
  const userTooltip = user?.isAdmin
    ? "Admin User"
    : user?.isBusiness
    ? "Business User"
    : "Regular User";

  const renderSearchField = () => (
    <TextField
      className="search-field"
      size="small"
      placeholder="Search cards..."
      variant="outlined"
      value={searchText}
      onChange={handleSearchChange}
      sx={{
        width: { xs: 160, sm: 220, md: 280 }, // smaller, responsive width
        "& .MuiOutlinedInput-input": { py: 0.75 }, // compact height
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon className="search-icon" />
          </InputAdornment>
        ),
        endAdornment: searchText && (
          <InputAdornment position="end">
            <IconButton
              size="small"
              onClick={clearSearch}
              edge="end"
              tabIndex={-1}
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );

  return (
    <>
      <AppBar
        className="app-header"
        sx={{ backgroundColor: mode === "dark" ? "#121212" : "#1976d2" }}
      >
        <Toolbar className="app-toolbar">
          {/* Left: Title */}
          <Typography variant="h5" className="app-title">
            BCards
          </Typography>

          {/* Theme toggle */}
          <IconButton
            onClick={toggleColorMode}
            color="inherit"
            className="theme-toggle"
          >
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {/* Search (right after toggle) */}
          <Box className="search-wrapper">{renderSearchField()}</Box>

          {/* Spacer pushes nav & user actions to the right */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop / Tablet nav buttons */}
          {!isMobile && (
            <Box className="nav-links">
              {navLinks.map((link) => (
                <Button
                  key={link.path}
                  color="inherit"
                  component={Link}
                  to={link.path}
                  size="small"
                  className={pathname === link.path ? "active-link" : ""}
                  sx={{ px: 1.25 }}
                >
                  {link.label}
                </Button>
              ))}

              {user && (
                <>
                  <Tooltip title={userTooltip}>
                    <IconButton
                      onClick={(e) => setAnchorEl(e.currentTarget)}
                      sx={{ ml: 0.5 }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "white",
                          color: "#1976d2",
                          width: 28,
                          height: 28,
                        }}
                      >
                        {userIcon}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem onClick={() => navigate("/edit-profile")}>
                      Edit Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          )}

          {/* Mobile: hamburger → Drawer with all buttons */}
          {isMobile && (
            <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer Content (Mobile) */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 280, p: 2 }}>
          {/* Optional: Search inside drawer, too */}
          <Box sx={{ mb: 1.5 }}>{renderSearchField()}</Box>

          <List>
            {navLinks.map((link) => (
              <ListItemButton
                key={link.path}
                component={Link}
                to={link.path}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            ))}

            {user && (
              <>
                <ListItemButton
                  component={Link}
                  to="/edit-profile"
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemText primary="Edit Profile" />
                </ListItemButton>
                <ListItemButton
                  onClick={() => {
                    setDrawerOpen(false);
                    handleLogoutClick();
                  }}
                >
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
