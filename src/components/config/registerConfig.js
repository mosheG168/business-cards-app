import Joi from "joi";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import ImageIcon from "@mui/icons-material/Image";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import HomeIcon from "@mui/icons-material/Home";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";

export const registerConfig = [
  {
    name: "first",
    label: "First Name",
    icon: PersonIcon,
    fullWidth: false,
    schema: Joi.string().pattern(/^[A-Za-z\s'-]+$/)
      .min(2).max(256).required()
      .label("First Name")
      .messages({
        "string.pattern.base": "First name can only contain letters, spaces, or '-",
      }),
  },
  {
    name: "middle",
    label: "Middle Name",
    icon: PersonIcon,
    fullWidth: false,
    schema: Joi.string().pattern(/^[A-Za-z\s'-]*$/)
      .allow("").max(256)
      .label("Middle Name")
      .messages({
        "string.pattern.base": "Middle name can only contain letters, spaces, or '-",
      }),
  },
  {
    name: "last",
    label: "Last Name",
    icon: PersonIcon,
    fullWidth: false,
    schema: Joi.string().pattern(/^[A-Za-z\s'-]+$/)
      .min(2).max(256).required()
      .label("Last Name")
      .messages({
        "string.pattern.base": "Last name can only contain letters, spaces, or '-",
      }),
  },
  {
    name: "phone",
    label: "Phone",
    icon: PhoneIcon,
    fullWidth: false,
    schema: Joi.string()
      .pattern(/^0\d{8,10}$/) 
      .required()
      .label("Phone")
      .messages({
        "string.pattern.base": "Phone number must be a valid Israeli number (e.g., 0501234567).",
      }),
  },
  {
    name: "email",
    label: "Email",
    icon: EmailIcon,
    fullWidth: false,
    schema: Joi.string().email({ tlds: false })
      .min(5).required()
      .label("Email")
      .messages({
        "string.email": "Please enter a valid email address.",
      }),
  },
  {
    name: "password",
    label: "Password",
    icon: LockIcon,
    type: "password",
    fullWidth: true,
    schema: Joi.string()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{7,20}$/)
      .required()
      .label("Password")
      .messages({
        "string.pattern.base":
          "Password must be 7–20 characters long, include uppercase, lowercase, a number, and a special character.",
      }),
  },
  {
    name: "imageUrl",
    label: "Image URL",
    icon: ImageIcon,
    fullWidth: true,
    schema: Joi.string().uri().allow("")
      .label("Image URL")
      .messages({
        "string.uri": "Please enter a valid image URL.",
      }),
  },
  {
    name: "imageAlt",
    label: "Image Alt",
    icon: ImageIcon,
    fullWidth: true,
    schema: Joi.string()
      .min(2).max(256).allow("")
      .label("Image Alt"),
  },
  {
    name: "country",
    label: "Country",
    icon: PublicIcon,
    fullWidth: false,
    schema: Joi.string()
      .pattern(/^[A-Za-z\s]+$/)
      .min(2).max(256).required()
      .label("Country")
      .messages({
        "string.pattern.base": "Country name can only contain letters and spaces.",
      }),
  },
  {
    name: "city",
    label: "City",
    icon: LocationCityIcon,
    fullWidth: false,
    schema: Joi.string()
      .pattern(/^[A-Za-z\s'-]+$/)
      .min(2).max(256).required()
      .label("City")
      .messages({
        "string.pattern.base": "City name can only contain letters, spaces, or '-",
      }),
  },
  {
    name: "street",
    label: "Street",
    icon: HomeIcon,
    fullWidth: false,
    schema: Joi.string()
      .min(2).max(256).required()
      .label("Street"),
  },
  {
    name: "state",
    label: "State",
    icon: HomeIcon,
    fullWidth: false,
    schema: Joi.string()
      .min(2).max(256).allow("").label("State"),
  },
  {
    name: "houseNumber",
    label: "House Number",
    icon: HomeIcon,
    type: "text",
    fullWidth: false,
    schema: Joi.string()
      .pattern(/^\d{2,256}$/)
      .required()
      .label("House Number")
      .messages({
        "string.pattern.base": "House Number must contain 2–256 digits only.",
      }),
  },
  {
    name: "zip",
    label: "ZIP Code",
    icon: LocalPostOfficeIcon,
    type: "text",
    fullWidth: false,
    schema: Joi.string()
      .pattern(/^\d{2,256}$/)
      .required()
      .label("ZIP Code")
      .messages({
        "string.pattern.base": "ZIP Code must contain 2–256 digits only.",
      }),
  },
];

export const registerSchema = Joi.object(
  registerConfig.reduce((acc, field) => {
    acc[field.name] = field.schema;
    return acc;
  }, { isBusiness: Joi.boolean().required() })
);
