import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Paper,
  Typography,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Box,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerConfig, registerSchema } from "../config/registerConfig";
import { registerUser } from "../services/authService";
import { useSnackbar } from "../context/SnackbarContext";
import "../../styles/registerForm.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState(
    registerConfig.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, { isBusiness: false })
  );
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const noErrors = Object.values(errors).every((err) => !err);
    const allRequiredFilled = registerConfig.every((field) =>
      !field.schema._flags.presence || formData[field.name]?.trim()
    );
    setIsFormValid(noErrors && allRequiredFilled);
  }, [formData, errors]);

  const validateField = (name, value) => {
    if (!registerSchema.extract(name)) return "";
    const { error } = registerSchema.extract(name).validate(value);
    return error ? error.details[0].message : "";
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, newValue),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = registerSchema.validate(formData, { abortEarly: false });

    if (error) {
      const newErrors = {};
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    const userPayload = {
      name: {
        first: formData.first,
        middle: formData.middle,
        last: formData.last,
      },
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      image: {
        url: formData.imageUrl,
        alt: formData.imageAlt,
      },
      address: {
        state: formData.state,
        country: formData.country,
        city: formData.city,
        street: formData.street,
        houseNumber: parseInt(formData.houseNumber, 10),
        zip: parseInt(formData.zip, 10),
      },
      isBusiness: formData.isBusiness,
    };

    try {
      await registerUser(userPayload);
      showSnackbar("Registered successfully!", "success");
      navigate("/login");
    } catch (err) {
      const errorMsg = err?.response?.data || "Registration failed.";
      showSnackbar(errorMsg, "error");
    }
  };

  return (
    <Container maxWidth="md" className="register-container">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" className="register-header">
          Register Here
        </Typography>
        <Divider className="register-divider" />
      </Box>
      
      <Paper elevation={3} className="register-card">
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            {registerConfig.map((field) => {
              const Icon = field.icon;
              return (
                <Grid item xs={12} sm={field.fullWidth ? 12 : 6} key={field.name}>
                  <TextField
                    name={field.name}
                    label={field.label}
                    type={field.type || "text"}
                    value={formData[field.name]}
                    onChange={handleChange}
                    error={!!errors[field.name]}
                    helperText={errors[field.name]}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              );
            })}

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isBusiness"
                    checked={formData.isBusiness}
                    onChange={handleChange}
                  />
                }
                label="Register as Business"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!isFormValid}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterForm;
