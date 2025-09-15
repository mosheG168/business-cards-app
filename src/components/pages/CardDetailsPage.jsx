import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Divider,
  Box,
  Paper,
  Link,
  Container,
  CircularProgress,
} from "@mui/material";
import { Phone as PhoneIcon } from "@mui/icons-material";
import { getCardById } from "../services/cardService";
import { useUser } from "../context/UserContext";
import { useSnackbar } from "../context/SnackbarContext";
import CardActionButtons from "../cards/CardActionButtons";
import "../../styles/CardDetailsPage.css";

const CardDetailsPage = () => {
  const { cardId } = useParams();
  const [card, setCard] = useState(null);
  const [error, setError] = useState("");

  const { user } = useUser();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const data = await getCardById(cardId);
        setCard(data);
      } catch {
        setError("Card not found or could not be fetched.");
      }
    };
    fetchCard();
  }, [cardId]);

  if (error) return <Typography color="error">{error}</Typography>;
  if (!card) {
    return (
      <Container className="details-loading">
        <CircularProgress />
      </Container>
    );
  }

  const address = card.address;
  const fullAddress = address?.street
    ? `${address.street} ${address.houseNumber}, ${address.city}`
    : null;
  const encodedAddress = fullAddress ? encodeURIComponent(fullAddress) : "";

  return (
    <Container className="details-container">
      <Paper className="details-card" elevation={3}>
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          className="back-button"
        >
          Back
        </Button>

        {user && (
          <Box className="details-action-buttons">
            <CardActionButtons card={card} />
          </Box>
        )}

        <Box className="details-image-box">
          <img
            src={card.image.url}
            alt={card.image.alt}
            className="details-image"
          />
        </Box>

        <Typography variant="h4" className="details-title">
          {card.title}
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          className="details-subtitle"
        >
          {card.subtitle}
        </Typography>

        <Divider className="details-divider" />
        <Typography variant="body1" className="details-description">
          {card.description}
        </Typography>
        <Divider className="details-divider" />

        <Typography variant="h6" className="details-heading">
          Contact
        </Typography>
        <Typography>Phone: {card.phone}</Typography>

        <Link
          href={`https://wa.me/${card.phone.replace(/[^0-9]/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
        >
          <Button
            variant="contained"
            color="success"
            fullWidth
            className="whatsapp-button"
            startIcon={<PhoneIcon />}
          >
            Message on WhatsApp
          </Button>
        </Link>

        <Typography className="details-email">Email: {card.email}</Typography>
        <Typography>Website: {card.web}</Typography>

        <Divider className="details-divider" />
        <Typography variant="h6" className="details-heading">
          Address
        </Typography>
        {fullAddress ? (
          <>
            <Typography>
              {fullAddress}, {address.country}
            </Typography>
            <Typography variant="h6" className="details-map-title">
              Location on Map
            </Typography>
            <Box className="details-map-box">
              <iframe
                width="100%"
                height="200"
                style={{ border: 0, borderRadius: 8 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
              />
            </Box>
          </>
        ) : (
          <Typography color="text.secondary">
            Address information is not available.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default CardDetailsPage;
