import * as Joi from '@hapi/joi';

export const params = Joi.object({
    id: Joi.number().required()
});

export const payload = Joi.object({
    name: Joi.string().min(3).required(),
    cpf_cnpj: Joi.string().pattern(new RegExp('^\\d{11}$|^\\d{14}$')).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});