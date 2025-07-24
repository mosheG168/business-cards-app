import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
} from "@mui/material";
import { toggleFavorite, deleteCard, getFavoriteCards } from "../services/cardService";
import { useUser } from "../context/UserContext";
import { useSnackbar } from "../context/SnackbarContext";
import CardList from "../cards/CardList";
import "../../styles/FavoriteCardsPage.css";

export default function FavoriteCardsPage() {
  const { user } = useUser();
  const { showSnackbar } = useSnackbar();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const loadFavorites = async () => {
    setLoading(true);
    try {
      const favorites = await getFavoriteCards(user._id);
      setCards(favorites);
    } catch {
      showSnackbar("Failed to load favorite cards", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) loadFavorites();
  }, [user?._id]);

  const handleUnfavorite = async (cardId) => {
    try {
      await toggleFavorite(cardId);
      showSnackbar("Removed from favorites", "info");
      loadFavorites();
    } catch {
      showSnackbar("Failed to update favorites", "error");
    }
  };

  const openDeleteDialog = (cardId) => {
    setSelectedCardId(cardId);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteCard(selectedCardId);
      showSnackbar("Card deleted successfully", "success");
      loadFavorites();
    } catch {
      showSnackbar("Failed to delete card", "error");
    } finally {
      setConfirmOpen(false);
      setSelectedCardId(null);
    }
  };

  if (loading) {
    return (
      <Container className="favorite-container">
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container className="favorite-container">
      <Typography variant="h4" className="favorite-header">
        My Favorite Cards
      </Typography>

      {cards.length === 0 ? (
        <Typography align="center">No favorites yet.</Typography>
      ) : (
        <CardList
          cards={cards}
          onUnfavorite={handleUnfavorite}
          onDelete={openDeleteDialog}
          mode="favorites"
        />
      )}

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Are you sure you want to delete this card?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button color="error" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
