import * as Joi from '@hapi/joi';

export const params = Joi.object({
  orderId: Joi.number().required(),
});

export const payload = Joi.object({
  products: Joi.array().items(
    Joi.object({
      id: Joi.number().required(),
      quantity: Joi.number().required(),
    })
  ),
});
