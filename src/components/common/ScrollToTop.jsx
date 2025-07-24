import { useEffect, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Zoom } from "@mui/material";
import "../../styles/ScrollToTop.css";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Zoom in={visible}>
      <div
        className="scroll-to-top"
        onClick={scrollToTop}
        role="button"
        aria-label="Scroll to top"
      >
        <KeyboardArrowUpIcon fontSize="large" />
      </div>
    </Zoom>
  );
};

export default ScrollToTop;
