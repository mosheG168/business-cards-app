import { Box, Typography, Paper, Divider, Stack, IconButton } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import "../../styles/AboutPage.css";

const AboutPage = () => {
  return (
    <Box className="about-container" sx={{ mt: 12, px: 3, py: 4 }}>
      <Paper className="about-card" elevation={8}>
        <Typography variant="h3" className="about-title" gutterBottom>
          About the Business Cards App
        </Typography>
        <Divider className="about-divider" />

        <Typography variant="body1" className="about-text" sx={{ mb: 3 }}>
          Welcome to the **Business Cards App** – a modern platform built for professionals and
          businesses to create, share, and manage digital business cards. Our mission is to simplify
          networking by combining clean design, powerful features, and secure authentication.
        </Typography>

        <Typography variant="body1" className="about-text" sx={{ mb: 3 }}>
          This app uses **JWT-based authentication** for enhanced security, allowing seamless login
          and role-based access. Business users can create, edit, and showcase their digital cards,
          while admins have full control over content and user management.
        </Typography>

        <Typography variant="body1" className="about-text" sx={{ mb: 3 }}>
          The user-friendly interface ensures that all your professional connections and branding
          materials are accessible anytime, anywhere, with built-in features like favorites,
          advanced search, and a responsive design that adapts to any device.
        </Typography>

        <Divider className="about-divider" />

        <Typography variant="h5" className="about-subtitle" sx={{ mt: 3 }}>
          Key Features
        </Typography>
        <ul className="about-list">
          <li>Secure JWT-based login & authentication</li>
          <li>Create, edit, and delete business cards (for business accounts)</li>
          <li>Advanced search and card filtering</li>
          <li>Favorites system for quick access</li>
          <li>Admin dashboard for managing users and cards</li>
          <li>Modern, responsive UI with Material-UI design</li>
        </ul>

        <Divider className="about-divider" />

        <Typography variant="body1" className="about-text" sx={{ mb: 3 }}>
          Our app is powered by a **REST API backend** hosted in the cloud for reliability and speed.
          The front-end is built using **React with Material-UI**, ensuring a modern and scalable
          architecture. Continuous improvements and new features are part of our roadmap.
        </Typography>

        <Divider className="about-divider" />

        <Typography variant="h5" className="about-subtitle" sx={{ textAlign: "center" }}>
          Connect With Us
        </Typography>
        <Stack direction="row" spacing={4} justifyContent="center" className="about-links" sx={{ mt: 3 }}>
          <IconButton
            href="https://mail.google.com/mail/?view=cm&fs=1&to=M.green4903@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
          >
            <EmailIcon fontSize="large" />
          </IconButton>
          <IconButton
            href="https://github.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
          >
            <GitHubIcon fontSize="large" />
          </IconButton>
        </Stack>
      </Paper>
    </Box>
  );
};

export default AboutPage;
