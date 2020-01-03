import Boom from '@hapi/boom';
import { instances } from 'hapi-sequelizejs';
import Bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import Env from '../../config/environment.config';
import DatabaseUtils from './database.utils';

export function getToken(payload, options = {}) {
    return JWT.sign(payload, Env.JWT_SECRET, { expiresIn: Env.JWT_EXPIRES_IN, ...options });
}

export async function authenticate({ email, password }) {
    console.log(email, password);
    const model = instances.getModel('User');
    const user = await DatabaseUtils.getObjectOr404(model, { where: { email }});
    console.log(user);
    const isValid = await Bcrypt.compare(password, user.password);

    if (!isValid) {
        throw Boom.notFound();
    }

    return user;
}

export function decodeToken(token) {
    if (token) {
        return JWT.verify(token, Env.JWT_SECRET);
    }
    return;
}

export async function getUserByToken(token) {
    const decode = decodeToken(token);

    if (decode) {
        const model = instances.getModel('User');
        return await DatabaseUtils.getObjectOr404(model, { where: { id: decode.id }});
    }
    return;
}