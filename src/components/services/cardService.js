import api from "./apiService";

export const createCard = async (cardData) => {
    const { data } = await api.post("/cards", cardData);
    return data;
};

export const getCards = async () => {
    const { data } = await api.get("/cards");
    return data;
};

export const getMyCards = async () => {
  const { data } = await api.get("/cards/my-cards");
  return data;
};

export const toggleFavorite = async (cardId) => {
  const { data } = await api.patch(`/cards/${cardId}`);
  return data; 
};

export const getFavoriteCards = async (userId) => {
  const { data } = await api.get("/cards");
  return data.filter((card) =>
    card.likes?.map(String).includes(String(userId))
  );
};

export const deleteCard = async (cardId) => {
  const { data } = await api.delete(`/cards/${cardId}`);
  return data;
};

export const getCardById = async (cardId) => {
  const { data } = await api.get(`/cards/${cardId}`);
  return data;
};

export const updateCard = async (cardId, updatedData) => {
  const { data } = await api.put(`/cards/${cardId}`, updatedData);
  return data;
};



