import * as Joi from '@hapi/joi';
import DocsUtils from '../utils/docs.utils';

export const params = Joi.object({
    id: Joi.number().required()
});

export const payload = Joi.object({
    name: Joi.string().min(3).required(),
    cpf_cnpj: Joi.string().pattern(new RegExp('^\\d{11}$|^\\d{14}$')).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    type: [
        Joi.number().min(1),
        Joi.object({
            id: Joi.number().min(1).required(),
            description: Joi.string()
        })
    ]
});

export const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export const queryList = Joi.object(
    DocsUtils.builderQueryParams([
        'id', 'name', 'cpf_cnpj', 'email', 'type'
    ])
);

export const queryDetail = Joi.object({
    fields: Joi.string().min(1)
});