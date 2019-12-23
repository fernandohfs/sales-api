import * as Joi from '@hapi/joi';

export const params = Joi.object({
  categoryId: Joi.number().required(),
});

export const payload = Joi.object({
  description: Joi.string()
    .min(3)
    .required(),
  quantity: Joi.number().required(),
  price: Joi.number().required(),
});
