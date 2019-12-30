import { instances } from 'hapi-sequelizejs';
import HapiAuthJWT from 'hapi-auth-jwt2';
import Env from './environment.config';
import Boom from '@hapi/boom';

const checkPermissionLevel = (app, user) => {
    const { type: { id } } = user;

    if ('authUserType' in app) {
        if (app.authUserType.indexOf(id) === -1) {
            throw Boom.forbidden('You do not have permission');
        }
    }

    return user;
}

const validate = async (decode, req, h) => {
    const { settings: { app } } = req.route;

    const User = instances.getModel('User');
    const user = await User.findByPk(decode.id);
    const isValid = !!user;

    const credentials = isValid ? checkPermissionLevel(app, user) : null;

    return { isValid, credentials };
}

async function register(server) {
    await server.register({
        plugin: HapiAuthJWT
    });

    server.auth.strategy('jwt', 'jwt', {
        key: Env.JWT_SECRET,
        validate
    });

    server.auth.default('jwt');
}

export const plugin = {
    name: 'authenticate',
    version: '1.0.0',
    register
}

export default plugin;