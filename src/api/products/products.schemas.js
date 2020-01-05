import * as Joi from '@hapi/joi';
import DocsUtils from '../utils/docs.utils';

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

export const detail = Joi.object({
  id: Joi.number().required(),
  categoryId: Joi.number().required(),
});

export const update = Joi.object({
  description: Joi.string().min(3),
  quantity: Joi.number(),
  price: Joi.number(),
});

export const queryList = Joi.object(
    DocsUtils.builderQueryParams([
        'id', 'description', 'quantity', 'price'
    ])
);

export const queryDetail = Joi.object({
    fields: Joi.string().min(1)
});