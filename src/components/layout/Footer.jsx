import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import "../../styles/Footer.css";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Typography,
  Box,
  Fade,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BusinessIcon from "@mui/icons-material/Business";
import { useEffect, useState } from "react";

const Footer = () => {
  const { user } = useUser();
  const isBusiness = user?.isBusiness;
  const isLoggedIn = !!user;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Fade in={visible} timeout={600}>
      <Box component="footer" className="footer">
        <Paper elevation={6} square className="footer-paper">
          <BottomNavigation showLabels className="footer-nav">
            <BottomNavigationAction
              label="About"
              icon={<InfoIcon />}
              component={Link}
              to="/about"
              className="footer-icon"
            />
            {isLoggedIn && (
              <BottomNavigationAction
                label="Favorites"
                icon={<FavoriteIcon />}
                component={Link}
                to="/favorites"
                className="footer-icon"
              />
            )}
            {isBusiness && (
              <BottomNavigationAction
                label="My Cards"
                icon={<BusinessIcon />}
                component={Link}
                to="/my-cards"
                className="footer-icon"
              />
            )}
          </BottomNavigation>

          <Typography variant="body2" align="center" className="footer-text">
            &copy; {new Date().getFullYear()} Moshe Green’s Business Cards App
          </Typography>
        </Paper>
      </Box>
    </Fade>
  );
};

export default Footer;
