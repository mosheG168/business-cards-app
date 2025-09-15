import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/tokenService";
import { getUserById, updateProfile } from "../services/userService";
import { useSnackbar } from "../context/SnackbarContext";
import { useUser } from "../context/UserContext";
import { profileFields, profileSchema } from "../config/profileConfig";
import "../../styles/EditProfilePage.css";

export default function EditProfilePage() {
  const { showSnackbar } = useSnackbar();
  const { setUser } = useUser();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const fetchUser = useCallback(async () => {
    if (!currentUser?._id) return;
    try {
      const data = await getUserById(currentUser._id);
      setFormData({
        first: data.name.first || "",
        last: data.name.last || "",
        middle: data.name.middle || "",
        phone: data.phone || "",
        email: data.email || "", // Only display, not editable
        image: data.image?.url || "",
        country: data.address?.country || "",
        city: data.address?.city || "",
        street: data.address?.street || "",
        houseNumber: data.address?.houseNumber?.toString() || "",
        zip: data.address?.zip?.toString() || "",
        state: data.address?.state || "",
      });
    } catch {
      showSnackbar("Failed to load profile", "error");
    }
  }, [currentUser?._id, showSnackbar]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!formData) return;
    const noErrors = Object.values(errors).every((err) => !err);
    const allFilled = profileFields
      .filter((field) => field.name !== "middle" && field.name !== "email")
      .every((field) => formData[field.name]?.trim() !== "");
    setIsFormValid(noErrors && allFilled);
  }, [formData, errors]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "middle" && !value) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
      return;
    }

    if (profileSchema.$_terms.keys.some((key) => key.key === name)) {
      const { error } = profileSchema.extract(name).validate(value);
      setErrors((prev) => ({
        ...prev,
        [name]: error ? error.details[0].message : "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = profileSchema.validate(formData, { abortEarly: false });
    if (error) {
      const newErrors = error.details.reduce((acc, d) => {
        acc[d.path[0]] = d.message;
        return acc;
      }, {});
      setErrors(newErrors);
      return;
    }

    try {
      const payload = { ...formData };
      delete payload.email;

      const response = await updateProfile(currentUser._id, payload);

      const updatedUser = await getUserById(currentUser._id);
      setUser(updatedUser);
      showSnackbar("Profile updated successfully", "success");
      navigate("/");
    } catch (err) {
      console.error("Update profile failed:", err?.response?.data || err);
      showSnackbar("Failed to update profile", "error");
    }
  };

  if (!formData) {
    return (
      <Container sx={{ mt: 8, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" className="edit-profile-container">
      <Typography variant="h4" className="edit-profile-header">
        Edit Your Profile
      </Typography>
      <Box component="form" onSubmit={handleSubmit} className="edit-profile-card">
        {profileFields
          .filter((field) => field.name !== "password") // Remove password field
          .map(({ name, label, icon: Icon, type }) => (
            <TextField
              key={name}
              className="edit-profile-field"
              label={label}
              name={name}
              type={type || "text"}
              value={formData[name]}
              onChange={handleChange}
              error={!!errors[name]}
              helperText={errors[name]}
              fullWidth
              disabled={name === "email"} 
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon />
                  </InputAdornment>
                ),
              }}
            />
          ))}

        <Button
          type="submit"
          variant="contained"
          className="edit-profile-button"
          disabled={!isFormValid}
        >
          Save Changes
        </Button>
      </Box>
    </Container>
  );
}
