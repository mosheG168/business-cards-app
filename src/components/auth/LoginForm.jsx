import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  CircularProgress,
  Box,
  Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import loginSchema from "../schemas/loginSchema";
import { loginUser } from "../services/authService";
import { useSnackbar } from "../context/SnackbarContext";
import { useUser } from "../context/UserContext";
import "../../styles/loginForm.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const { login } = useUser();

  useEffect(() => {
    const noErrors = Object.values(errors).every((err) => !err);
    const allFilled = formData.email.trim() !== "" && formData.password.trim() !== "";
    setIsFormValid(noErrors && allFilled);
  }, [formData, errors]);

  const validate = () => {
    const { error } = loginSchema.validate(formData, { abortEarly: false });
    if (!error) return null;

    const err = {};
    for (let item of error.details) err[item.path[0]] = item.message;
    return err;
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (loginSchema.extract(name)) {
      const { error } = loginSchema.extract(name).validate(value);
      setErrors((prev) => ({
        ...prev,
        [name]: error ? error.details[0].message : "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors || {});
    if (validationErrors) return;

    setLoading(true);
    try {
      const token = await loginUser(formData);
      login(token, true);
      showSnackbar("Login successful!", "success");

      const decoded = jwtDecode(token);
      if (decoded.isAdmin) navigate("/admin");
      else if (decoded.isBusiness) navigate("/create-card");
      else navigate("/");
    } catch (err) {
      showSnackbar(err?.response?.data || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="login-container" maxWidth="sm">
      <Box sx={{ mb: 3 }}>
        <Typography className="login-header" variant="h4">
          Login to Your Account
        </Typography>
        <Divider className="login-divider" />
      </Box>

      <Paper className="login-card" elevation={3}>
        <form onSubmit={handleSubmit} noValidate>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <TextField
                className="login-field"
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon className="input-icon" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item>
              <TextField
                className="login-field"
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon className="input-icon" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item>
              <Button
                className="login-button"
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading || !isFormValid}
                startIcon={loading && <CircularProgress size={20} color="inherit" />}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;
