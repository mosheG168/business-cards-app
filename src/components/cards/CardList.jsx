import { Grid } from "@mui/material";
import CardItem from "./CardItem";
import "../../styles/CardList.css";

const CardList = ({ cards, onDelete, onToggleFavorite, onUnfavorite, mode = "default" }) => {
  if (!cards?.length) return <p className="no-cards">No cards found.</p>;

  return (
    <Grid container spacing={3} className="card-list-container">
      {cards.map((card) => (
        <Grid item key={card._id} xs={12} sm={6} md={3} lg={2} className="card-grid-item">
          <CardItem
            card={card}
            onDelete={onDelete}
            onToggleFavorite={onToggleFavorite}
            onUnfavorite={onUnfavorite}
            mode={mode}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardList;
