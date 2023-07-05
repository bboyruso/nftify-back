import { Joi } from "express-validation";
import { type UserCredentials } from "../../server/types";

const registerSchema = {
  body: Joi.object<UserCredentials>({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required(),
    name: Joi.string(),
  }),
};

export default registerSchema;
