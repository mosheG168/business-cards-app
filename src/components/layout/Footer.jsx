import { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BusinessIcon from "@mui/icons-material/Business";
import "../../styles/Footer.css";

const Footer = () => {
  const { user } = useUser();
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const isBusiness = user?.isBusiness;
  const isLoggedIn = !!user;

  return (
    <Paper className="footer-paper" elevation={3}>
      <BottomNavigation
        className="footer-nav"
        showLabels
        value={value}
        onChange={(e, newValue) => {
          setValue(newValue);
          navigate(newValue);
        }}
      >
        <BottomNavigationAction label="About" icon={<InfoIcon />} value="/about" />
        {isLoggedIn && (
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} value="/favorites" />
        )}
        {isBusiness && (
          <BottomNavigationAction label="My Cards" icon={<BusinessIcon />} value="/my-cards" />
        )}
      </BottomNavigation>
    </Paper>
  );
};

export default Footer;
