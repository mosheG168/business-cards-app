import Joi from "joi";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ImageIcon from "@mui/icons-material/Image";
import PublicIcon from "@mui/icons-material/Public";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import HomeIcon from "@mui/icons-material/Home";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";

export const profileFields = [
  { name: "first", label: "First Name", icon: PersonIcon },
  { name: "middle", label: "Middle Name", icon: PersonIcon }, // Optional
  { name: "last", label: "Last Name", icon: PersonIcon },
  { name: "phone", label: "Phone", icon: PhoneIcon },
  { name: "email", label: "Email", icon: EmailIcon }, // Email is displayed but not editable
  { name: "image", label: "Image URL", icon: ImageIcon },
  { name: "country", label: "Country", icon: PublicIcon },
  { name: "state", label: "State", icon: HomeIcon }, // Optional
  { name: "city", label: "City", icon: LocationCityIcon },
  { name: "street", label: "Street", icon: HomeIcon },
  { name: "houseNumber", label: "House Number", icon: HomeIcon },
  { name: "zip", label: "ZIP Code", icon: LocalPostOfficeIcon },
];

export const profileSchema = Joi.object({
  first: Joi.string().min(2).required().label("First Name"),
  middle: Joi.string().allow("").max(256).label("Middle Name"),
  last: Joi.string().min(2).required().label("Last Name"),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(9)
    .max(11)
    .required()
    .label("Phone")
    .messages({ "string.pattern.base": "Phone must contain only digits." }),
  email: Joi.string().email({ tlds: false }).required().label("Email"),
  image: Joi.string().uri().allow("").label("Image URL"),
  country: Joi.string().min(2).required().label("Country"),
  state: Joi.string().allow("").max(256).label("State"),
  city: Joi.string().min(2).required().label("City"),
  street: Joi.string().min(2).required().label("Street"),
  houseNumber: Joi.string()
    .pattern(/^\d{2,256}$/)
    .required()
    .label("House Number")
    .messages({ "string.pattern.base": "House Number must have at least 2 digits." }),
  zip: Joi.string()
    .pattern(/^\d{2,256}$/)
    .required()
    .label("ZIP Code")
    .messages({ "string.pattern.base": "ZIP Code must have at least 2 digits." }),
});
