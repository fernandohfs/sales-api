import * as Joi from '@hapi/joi';
import DocsUtils from '../utils/docs.utils';

export const params = Joi.object({
  id: Joi.number().required(),
});

export const payload = Joi.object({
  description: Joi.string()
    .min(3)
    .required(),
});

export const queryList = Joi.object(
    DocsUtils.builderQueryParams([
        'id', 'description'
    ])
);

export const queryDetail = Joi.object({
    fields: Joi.string().min(1)
});