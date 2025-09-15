import Joi from "joi";

const cardSchema = Joi.object({
  title: Joi.string().min(2).max(256).required().label("Title"),
  subtitle: Joi.string().min(2).max(256).required().label("Subtitle"),
  description: Joi.string().min(2).max(1024).required().label("Description"),
  phone: Joi.string()
    .pattern(/^\d{9,11}$/)
    .required()
    .label("Phone")
    .messages({
      "string.pattern.base": "Phone number must contain 9–11 digits only.",
    }),
  email: Joi.string().email({ tlds: false }).required().label("Email"),
  web: Joi.string().uri().allow("").label("Website"),
  imageUrl: Joi.string().uri().allow("").label("Image URL"),
  imageAlt: Joi.string().min(2).max(256).allow("").label("Image Alt"),
  state: Joi.string().allow("").label("State"),
  country: Joi.string().min(2).max(256).required().label("Country"),
  city: Joi.string().min(2).max(256).required().label("City"),
  street: Joi.string().min(2).max(256).required().label("Street"),
  houseNumber: Joi.string()
    .pattern(/^\d{2,256}$/)
    .required()
    .label("House Number")
    .messages({
      "string.pattern.base": "House Number must contain 2–256 digits only.",
    }),
  zip: Joi.string()
    .pattern(/^\d{2,256}$/)
    .required()
    .label("ZIP")
    .messages({
      "string.pattern.base": "ZIP Code must contain 2–256 digits only.",
    }),
});

export default cardSchema;
