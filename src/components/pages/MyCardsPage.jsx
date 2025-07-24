import { useEffect, useState } from "react";
import { getMyCards } from "../services/cardService";
import CardList from "../cards/CardList";
import { useUser } from "../context/UserContext";

const MyCardsPage = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");
  const { user } = useUser();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const allCards = await getMyCards();
        const userCards = allCards.filter((card) => card.user_id === user._id);
        setCards(userCards);
      } catch (err) {
        setError("Failed to load your cards.");
      }
    };

    if (user) fetchCards();
  }, [user]);

  return (
    <div>
      <h1>My Business Cards</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <CardList cards={cards} />
    </div>
  );
};

export default MyCardsPage;
