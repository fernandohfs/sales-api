import * as Joi from '@hapi/joi';

export const params = Joi.object({
  id: Joi.number().required(),
});