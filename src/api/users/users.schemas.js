import * as Joi from '@hapi/joi';
import DocsUtils from '../utils/docs.utils';
const { cpf, cnpj } = require('cpf-cnpj-validator');

const cpfCnpjValidator = (value, helpers) => {
    if (cpf.isValid(value) || cnpj.isValid(value)) {
        return value;
    }

    return helpers.message('"cpf_cnpj" is invalid, check amount of numbers, and too the check digit for validation the document');
}  

export const params = Joi.object({
    id: Joi.number().required()
});

export const payload = Joi.object({
    name: Joi.string().min(3).required(),
    cpf_cnpj: Joi.string().required().custom(cpfCnpjValidator),
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