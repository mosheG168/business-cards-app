import api from "./apiService";

export const getUsers = async () => {
  const { data } = await api.get("/users");
  return data;
};

export const toggleBusinessStatus = async (userId) => {
  const { data } = await api.patch(`/users/${userId}`);
  return data;
};

export const deleteUser = async (userId) => {
  const { data } = await api.delete(`/users/${userId}`);
  return data;
};

