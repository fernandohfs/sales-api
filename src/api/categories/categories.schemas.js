import * as Joi from '@hapi/joi';

export const detail = Joi.object({
  id: Joi.number().required(),
});

export const payload = Joi.object({
  description: Joi.string()
    .min(3)
    .required(),
});
