import Boom from '@hapi/boom';
import UsersDao from './users.dao';
import { authenticate, getToken, getUserByToken } from '../utils/auth.utils';

class UsersBusiness {
    constructor() {
        this.usersTypesRestricted = [2];
        this.userTypeWithPermission = [2]; 
    }

    async findAll({ params, query }) {
        return UsersDao.findAll({ params, query });
    }

    async findOne({ params, query, headers }) {
        await this._checkPermissionToHandlerOrViewOtherUser(params.id, headers);
        return UsersDao.findOne({ params, query });
    }

    async login({ payload }) {
        const user = await authenticate(payload);
        const token = getToken({
            id: user.id,
            email: user.email
        });

        return { user: {  
                    id: user.id, 
                    name: user.name,
                    email: user.email 
                }, token };
    }

    async create({ payload, headers }) {
        await this._checkPermissionSetType(payload, headers);
        return UsersDao.create(payload);
    }

    async update({ params, payload, headers }) {
        await this._checkPermissionToHandlerOrViewOtherUser(params.id, headers);
        await this._checkPermissionSetType(payload, headers);

        return UsersDao.update({ params }, payload);
    }

    async delete({ params, headers}) {
        await this._checkPermissionToHandlerOrViewOtherUser(params.id, headers);
        return UsersDao.delete({ params });
    }

    async _checkPermissionSetType(payload, headers) {
        const token = this._getToken(headers);
        const user = await getUserByToken(token);

        if ('type' in payload) {
            let { type } = payload;
            let userType = user ? user.type.id : user;

            type = (typeof type === "object") ? type.id : type;

            if (this.usersTypesRestricted.indexOf(type) !== -1 &&
                this.userTypeWithPermission.indexOf(userType) === -1) {
                throw Boom.badRequest('You do not have permission to set this value in type');
            }
        }
    }

    async _checkPermissionToHandlerOrViewOtherUser(id, headers) {
        const token = this._getToken(headers);
        const { type: { id:idUserType }, id:idUser } = await getUserByToken(token);

        if (id !== idUser && this.userTypeWithPermission.indexOf(idUserType) === -1) {
            throw Boom.badRequest('You do not have permission to handler or view other user');
        }
    } 

    _getToken({ authorization }) {
        if (authorization) {
            return authorization.replace('Bearer ', '');
        }   
        return;       
    }
}

export default new UsersBusiness();