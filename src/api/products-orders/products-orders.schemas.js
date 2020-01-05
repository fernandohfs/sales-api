import * as Joi from '@hapi/joi';

export const params = Joi.object({
  orderId: Joi.number().required(),
});

export const params2 = Joi.object({
    orderId: Joi.number().required(),
    productId: Joi.number().required()
});

export const payload = Joi.object({
  products: Joi.array().items(
    Joi.object({
      id: Joi.number().required(),
      quantity: Joi.number().min(0).required(),
    })
  ),
});

export const update = Joi.object({
  quantity: Joi.number().required(),
});
