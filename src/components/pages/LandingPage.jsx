import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCards, toggleFavorite } from "../services/cardService";
import CardList from "../cards/CardList";
import { useUser } from "../context/UserContext";
import { Container, Typography, CircularProgress } from "@mui/material";
import "../../styles/LandingPage.css";

const LandingPage = () => {
  const location = useLocation();
  const { user } = useUser();
  const query = new URLSearchParams(location.search).get("search") || "";

  const [search, setSearch] = useState(query);
  const [cards, setCards] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCards = async () => {
      try {
        const allCards = await getCards();
        setCards(allCards);
        setFiltered(allCards);
      } catch {
        setError("Failed to load cards.");
      } finally {
        setLoading(false);
      }
    };
    loadCards();
  }, []);

  useEffect(() => {
    const lowered = search.toLowerCase();
    const result = cards.filter((card) =>
      [card.title, card.subtitle, card.phone, card.address.city].some((field) =>
        field?.toLowerCase().includes(lowered)
      )
    );
    setFiltered(result);
  }, [search, cards]);

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
      <Container className="landing-container loading-container">
        <CircularProgress />
      </Container>
    );
  }

  return (
  <Container className="landing-container">
    <Typography variant="h3" className="landing-header">
      Discover & Share Digital Business Cards
    </Typography>
    <Typography variant="subtitle1" className="landing-subheader">
      Connect with professionals and showcase your brand – all in one place.
    </Typography>

    {error && (
      <Typography color="error" variant="body2" className="error-text">
        {error}
      </Typography>
    )}

    <CardList
      cards={filtered.slice(0, 72)}
      onToggleFavorite={handleToggleFavorite}
      onDelete={(id) => setCards((prev) => prev.filter((c) => c._id !== id))}
    />
  </Container>
);
}


export default LandingPage;
