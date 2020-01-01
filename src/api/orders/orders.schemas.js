import * as Joi from '@hapi/joi';

export const params = Joi.object({
  id: Joi.number().required(),
});

export const payload = Joi.object({
  userId: Joi.number().required(),
  productOrder: Joi.array().items(Joi.object({
    productId: Joi.number().required(),
    quantity: Joi.number().required()
  }))
});