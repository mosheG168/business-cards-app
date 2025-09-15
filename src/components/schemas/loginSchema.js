import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: false })
    .min(5)
    .required()
    .label("Email")
    .messages({
      "string.email": "Please enter a valid email address.",
    }),

  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{7,20}$/)
    .required()
    .label("Password")
    .messages({
      "string.pattern.base":
        "Password must be 7–20 chars with uppercase, lowercase, number, and a special character (!@#$%^&*).",
    }),
});

export default loginSchema;
