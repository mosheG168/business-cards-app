import {
  Card as MuiCard,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Phone, Favorite } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import CardActionButtons from "./CardActionButtons";
import "../../styles/CardItem.css";

const CardItem = ({ card, onToggleFavorite, onUnfavorite, mode = "default" }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleCardClick = () => navigate(`/cards/${card._id}`);

  const handleWhatsAppClick = (e) => {
    e.stopPropagation();
    window.open(
      `https://wa.me/${card.phone.replace(/[^0-9]/g, "")}`,
      "_blank"
    );
  };

  const handleUnfavorite = (e) => {
    e.stopPropagation();
    onUnfavorite?.(card._id);
  };

  return (
    <MuiCard className="card-item" onClick={handleCardClick}>
      <CardMedia
        component="img"
        className="card-image"
        image={
          card.image?.url?.startsWith("http")
            ? card.image.url
            : "https://placehold.co/300x180?text=No+Image"
        }
        alt={card.image?.alt || card.title}
      />

      <CardContent className="card-content">
        <Typography variant="h6" className="card-title" noWrap>
          {card.title}
        </Typography>
        <Typography variant="body2" className="card-subtitle" noWrap>
          {card.subtitle}
        </Typography>
        <Typography variant="body2" noWrap>{`Phone: ${card.phone}`}</Typography>
        <Typography variant="body2" noWrap>
          {`${card.address.city}, ${card.address.street} ${card.address.houseNumber}`}
        </Typography>
      </CardContent>

      <Box className="card-buttons">
        <Tooltip title="Contact">
          <IconButton size="small" color="primary" onClick={handleWhatsAppClick}>
            <Phone fontSize="small" />
          </IconButton>
        </Tooltip>

        {mode === "favorites" && (
          <Tooltip title="Remove from Favorites">
            <IconButton size="small" color="error" onClick={handleUnfavorite}>
              <Favorite fontSize="small" />
            </IconButton>
          </Tooltip>
        )}

        {user && (
          <CardActionButtons
            card={card}
            onToggleFavorite={onToggleFavorite}
            showFavorite={mode !== "favorites"}
          />
        )}
      </Box>
    </MuiCard>
  );
};

export default CardItem;
