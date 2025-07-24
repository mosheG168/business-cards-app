import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCardById, updateCard } from "../services/cardService";
import cardSchema from "../schemas/cardSchema";
import Joi from "joi";
import { useSnackbar } from "../context/SnackbarContext";
import {
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  Box,
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

const EditCardPage = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const data = await getCardById(cardId);
        setFormData({
          title: data.title,
          subtitle: data.subtitle,
          description: data.description,
          phone: data.phone,
          email: data.email,
          web: data.web,
          imageUrl: data.image.url,
          imageAlt: data.image.alt,
          state: data.address.state,
          country: data.address.country,
          city: data.address.city,
          street: data.address.street,
          houseNumber: String(data.address.houseNumber),
          zip: String(data.address.zip),
        });
      } catch {
        showSnackbar("Failed to fetch card data", "error");
      }
    };
    fetchCard();
  }, [cardId, showSnackbar]);

  useEffect(() => {
    if (formData) {
      const noErrors = Object.values(errors).every((err) => !err);
      const allFilled = fields.every((field) => formData[field.name]?.trim() !== "");
      setIsFormValid(noErrors && allFilled);
    }
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

    const updatedCard = {
      title: formData.title,
      subtitle: formData.subtitle,
      description: formData.description,
      phone: formData.phone,
      email: formData.email,
      web: formData.web,
      image: { url: formData.imageUrl, alt: formData.imageAlt },
      address: {
        state: formData.state,
        country: formData.country,
        city: formData.city,
        street: formData.street,
        houseNumber: +formData.houseNumber,
        zip: +formData.zip,
      },
    };

    try {
      await updateCard(cardId, updatedCard);
      showSnackbar("Card updated successfully!", "success");
      navigate("/my-cards");
    } catch {
      showSnackbar("Failed to update card", "error");
    }
  };

  if (!formData) return <Typography>Loading card data...</Typography>;

  return (
    <Container maxWidth="md" className="create-card-container">
      <Typography variant="h4" className="create-card-header">
        Edit Your Business Card
      </Typography>

      <Paper elevation={3} className="create-card-card">
        <Box component="form" onSubmit={handleSubmit} className="create-card-form">
          {fields.map((f) => {
            const Icon = f.icon;
            return (
              <TextField
                key={f.name}
                className={`create-card-field ${f.name === "description" ? "description-field" : ""}`}
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

          <Button type="submit" variant="contained" className="create-card-button" disabled={!isFormValid}>
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditCardPage;
