import * as Joi from 'joi';

const configSchema = Joi.object({
  DATABASE_URL: Joi.string().required(),
  ADMIN_EMAIL: Joi.string().required(),
  ADMIN_PASSWORD: Joi.string().required(),
  ADMIN_USERNAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_VALID_DAYS: Joi.number().required(),
});

export default configSchema;
