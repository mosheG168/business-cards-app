import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCards, toggleFavorite } from "../services/cardService";
import { useUser } from "../context/UserContext";
import CardList from "../cards/CardList";
import { Container, Typography, CircularProgress } from "@mui/material";

const CardsPage = () => {
  const location = useLocation();
  const { user } = useUser();
  const [cards, setCards] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const searchQuery = new URLSearchParams(location.search)
    .get("search")
    ?.toLowerCase()
    .trim() || "";

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getCards();
        setCards(data);
        setFiltered(data);
      } catch (err) {
        setError("Failed to load cards.");
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFiltered(cards);
    } else {
      const result = cards.filter((card) =>
        [card.title, card.subtitle, card.phone, card.address?.city]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(searchQuery))
      );
      setFiltered(result);
    }
  }, [searchQuery, cards]);

  const handleToggleFavorite = async (cardId) => {
    try {
      await toggleFavorite(cardId);
      setCards((prev) =>
        prev.map((card) =>
          card._id === cardId
            ? {
                ...card,
                likes: card.likes.includes(user._id)
                  ? card.likes.filter((id) => id !== user._id)
                  : [...card.likes, user._id],
              }
            : card
        )
      );
    } catch (err) {
      console.error("Failed to toggle favorite", err);
    }
  };

  if (loading) {
    return (
      <Container sx={{ mt: 8, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 12 }}>

      {error && (
        <Typography color="error" variant="body2" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <CardList
        cards={filtered}
        onToggleFavorite={handleToggleFavorite}
        mode="default"
      />
    </Container>
  );
};

export default CardsPage;
