import { IconButton, Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { Favorite, FavoriteBorder, Edit, Delete } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCard, toggleFavorite } from "../services/cardService";
import { useSnackbar } from "../context/SnackbarContext";
import { useUser } from "../context/UserContext";

const CardActionButtons = ({ card, showFavorite = true }) => {
  const { user } = useUser();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(card.likes?.includes(user?._id));
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleToggleFavorite = async (e) => {
    e.stopPropagation();
    try {
      await toggleFavorite(card._id);
      setIsFavorite((prev) => !prev);
      showSnackbar(
        !isFavorite ? "Added to favorites" : "Removed from favorites",
        "success"
      );
    } catch {
      showSnackbar("Failed to toggle favorite", "error");
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setConfirmOpen(true);
  };

  const confirmDelete = async (e) => {
    e.stopPropagation();
    try {
      await deleteCard(card._id);
      showSnackbar("Card deleted", "success");
      navigate("/my-cards");
    } catch {
      showSnackbar("Failed to delete card", "error");
    } finally {
      setConfirmOpen(false);
    }
  };

  const isOwner = user && card.user_id === user._id;

  return (
    <>
      {showFavorite && (
        <IconButton size="small" color="error" onClick={handleToggleFavorite}>
          {isFavorite ? (
            <Favorite fontSize="small" />
          ) : (
            <FavoriteBorder fontSize="small" />
          )}
        </IconButton>
      )}

      {isOwner && (
        <>
          <IconButton
            size="small"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/edit-card/${card._id}`);
            }}
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error" onClick={handleDeleteClick}>
            <Delete fontSize="small" />
          </IconButton>
        </>
      )}

      <Dialog
        open={confirmOpen}
        onClose={(e) => {
          e.stopPropagation();
          setConfirmOpen(false);
        }}
      >
        <DialogTitle>Are you sure you want to delete this card?</DialogTitle>
        <DialogActions>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setConfirmOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CardActionButtons;
