import * as Joi from '@hapi/joi';

export const userId = Joi.object({
  userId: Joi.number().required(),
});

export const params = Joi.object({
  userId: Joi.number().required(),
  orderId: Joi.number().required(),
});
