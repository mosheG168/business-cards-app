import api from "./apiService";

export const getUserById = async (userId) => {
  const { data } = await api.get(`/users/${userId}`);
  return data;
};

export const updateProfile = async (userId, updatedData) => {
  const payload = {
    name: {
      first: updatedData.first,
      middle: updatedData.middle || "",
      last: updatedData.last,
    },
    phone: updatedData.phone,
    image: {
      url: updatedData.image || "",
      alt: updatedData.imageAlt || "",
    },
    address: {
      state: updatedData.state || "",
      country: updatedData.country,
      city: updatedData.city,
      street: updatedData.street,
      houseNumber: +updatedData.houseNumber,
      zip: +updatedData.zip,
    },
  };

  const { data } = await api.put(`/users/${userId}`, payload);
  return data;
};
