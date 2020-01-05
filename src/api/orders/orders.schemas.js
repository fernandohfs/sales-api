import * as Joi from '@hapi/joi';
import DocsUtils from '../utils/docs.utils';

export const userId = Joi.object({
  userId: Joi.number().required(),
});

export const params = Joi.object({
  userId: Joi.number().required(),
  orderId: Joi.number().required(),
});

export const queryList = Joi.object(
    DocsUtils.builderQueryParams([
        'id', 'total'
    ])
);

export const queryDetail = Joi.object({
    fields: Joi.string().min(1)
});