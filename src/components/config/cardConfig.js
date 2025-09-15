import Joi from "joi";
import TitleIcon from "@mui/icons-material/Title";
import NotesIcon from "@mui/icons-material/Notes";
import DescriptionIcon from "@mui/icons-material/Description";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import ImageIcon from "@mui/icons-material/Image";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import HomeIcon from "@mui/icons-material/Home";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";

export const cardFields = [
  { name: "title", label: "Title", icon: TitleIcon },
  { name: "subtitle", label: "Subtitle", icon: NotesIcon },
  { name: "description", label: "Description", icon: DescriptionIcon, multiline: true, rows: 3 },
  { name: "phone", label: "Phone", icon: PhoneIcon },
  { name: "email", label: "Email", icon: EmailIcon },
  { name: "web", label: "Website", icon: LanguageIcon },
  { name: "imageUrl", label: "Image URL", icon: ImageIcon },
  { name: "imageAlt", label: "Image Alt", icon: ImageIcon },
  { name: "country", label: "Country", icon: PublicIcon },
  { name: "city", label: "City", icon: LocationCityIcon },
  { name: "street", label: "Street", icon: HomeIcon },
  { name: "state", label: "State", icon: HomeIcon },
  { name: "houseNumber", label: "House Number", icon: HomeIcon },
  { name: "zip", label: "ZIP Code", icon: LocalPostOfficeIcon },
];

export const cardSchema = Joi.object({
  title: Joi.string().min(2).max(256).required().label("Title"),
  subtitle: Joi.string().min(2).max(256).required().label("Subtitle"),
  description: Joi.string().min(2).max(1024).required().label("Description"),
  phone: Joi.string().pattern(/^[0-9]+$/).min(9).max(11).required().label("Phone"),
  email: Joi.string().email({ tlds: false }).required().label("Email"),
  web: Joi.string().uri().allow("").label("Website"),
  imageUrl: Joi.string().uri().allow("").label("Image URL"),
  imageAlt: Joi.string().min(2).max(256).allow("").label("Image Alt"),
  state: Joi.string().allow(""),
  country: Joi.string().min(2).max(256).required().label("Country"),
  city: Joi.string().min(2).max(256).required().label("City"),
  street: Joi.string().min(2).max(256).required().label("Street"),
  houseNumber: Joi.string().pattern(/^\d{2,3}$/).required().label("House Number"),
  zip: Joi.string().pattern(/^\d{2,7}$/).required().label("ZIP Code"),
});
