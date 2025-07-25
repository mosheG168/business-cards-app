import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import "../../styles/Footer.css";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BusinessIcon from "@mui/icons-material/Business";

const Footer = () => {
  const { user } = useUser();
  const [showFooter, setShowFooter] = useState(false);

  const isBusiness = user?.isBusiness;
  const isLoggedIn = !!user;

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 5;
      setShowFooter(bottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showFooter) return null;

  return (
    <footer className="footer">
      <div className="footer-paper">
        <div className="footer-content">
          <nav className="footer-nav">
            <Link to="/about" className="footer-link">
              <InfoIcon className="footer-icon" />
              <span>About</span>
            </Link>
            {isLoggedIn && (
              <Link to="/favorites" className="footer-link">
                <FavoriteIcon className="footer-icon" />
                <span>Favorites</span>
              </Link>
            )}
            {isBusiness && (
              <Link to="/my-cards" className="footer-link">
                <BusinessIcon className="footer-icon" />
                <span>My Cards</span>
              </Link>
            )}
          </nav>
          <p className="footer-text">
            &copy; {new Date().getFullYear()} Moshe Green’s Business Cards App
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
