import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  InputAdornment,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LinkIcon from "@mui/icons-material/Link";
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";
import PublicIcon from "@mui/icons-material/Public";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import HomeIcon from "@mui/icons-material/Home";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import cardSchema from "../schemas/cardSchema";
import { createCard } from "../services/cardService";
import { useSnackbar } from "../context/SnackbarContext";
import "../../styles/CreateCardForm.css";

const fields = [
  { name: "title", label: "Title", icon: TitleIcon },
  { name: "subtitle", label: "Subtitle", icon: TitleIcon },
  { name: "description", label: "Description", icon: DescriptionIcon, multiline: true, rows: 4 },
  { name: "phone", label: "Phone", icon: PhoneIcon },
  { name: "email", label: "Email", icon: EmailIcon },
  { name: "web", label: "Website", icon: LinkIcon },
  { name: "imageUrl", label: "Image URL", icon: ImageIcon },
  { name: "imageAlt", label: "Image Alt", icon: ImageIcon },
  { name: "country", label: "Country", icon: PublicIcon },
  { name: "city", label: "City", icon: LocationCityIcon },
  { name: "street", label: "Street", icon: HomeIcon },
  { name: "state", label: "State", icon: HomeIcon },
  { name: "houseNumber", label: "House Number", icon: HomeIcon },
  { name: "zip", label: "ZIP Code", icon: LocalPostOfficeIcon },
];

const CreateCardForm = () => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {})
  );
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const noErrors = Object.values(errors).every((err) => !err);
    const allFilled = fields.every((field) => formData[field.name]?.trim() !== "");
    setIsFormValid(noErrors && allFilled);
  }, [formData, errors]);

  const validate = () => {
    const { error } = cardSchema.validate(formData, { abortEarly: false });
    if (!error) return null;
    return error.details.reduce((acc, d) => ({ ...acc, [d.path[0]]: d.message }), {});
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (cardSchema.extract(name)) {
      const { error } = cardSchema.extract(name).validate(value);
      setErrors((prev) => ({ ...prev, [name]: error ? error.details[0].message : "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors || {});
    if (validationErrors) return;

    const payload = {
      title: formData.title.trim(),
      subtitle: formData.subtitle.trim(),
      description: formData.description.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      web: formData.web.trim(),
      image: { url: formData.imageUrl.trim(), alt: formData.imageAlt.trim() },
      address: {
        state: formData.state.trim(),
        country: formData.country.trim(),
        city: formData.city.trim(),
        street: formData.street.trim(),
        houseNumber: +formData.houseNumber,
        zip: +formData.zip,
      },
    };

    try {
      await createCard(payload);
      showSnackbar("Card created successfully!", "success");
      navigate("/my-cards");
    } catch (err) {
      setServerError(err?.response?.data || "Card creation failed.");
    }
  };

  return (
    <Container maxWidth="md" className="create-card-container">
      <Typography variant="h4" className="create-card-header">
        Create New Business Card
      </Typography>

      <Paper elevation={3} className="create-card-card">
        <Box component="form" onSubmit={handleSubmit} className="create-card-form">
          {fields.map((f) => {
            const Icon = f.icon;
            return (
              <TextField
                key={f.name}
                className="create-card-field"
                label={f.label}
                name={f.name}
                value={formData[f.name]}
                onChange={handleChange}
                error={!!errors[f.name]}
                helperText={errors[f.name]}
                fullWidth
                multiline={f.multiline || false}
                rows={f.rows || 1}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon />
                    </InputAdornment>
                  ),
                }}
              />
            );
          })}

          {serverError && (
            <Typography color="error" className="create-card-error">
              {serverError}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            className="create-card-button"
            disabled={!isFormValid}
          >
            Create Card
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateCardForm;
