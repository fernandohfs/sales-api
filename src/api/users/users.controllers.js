import { CREATED, NO_CONTENT } from 'http-status';
import { authenticate, getToken } from '../utils/auth.utils';
import UsersDao from './users.dao';

class UsersController {
    async list(req, h) {
        return UsersDao.findAll();
    }

    async detail(req, h) {
        const { id } = req.params;
        return UsersDao.findById(id);
    }

    async login({ payload }, h) {
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

    async create(req, h) {
        const { payload } = req;
        const user =  await UsersDao.create(payload);
        
        return h.response(user).code(CREATED);
    }

    async update(req, h) {
        const { params: { id }, payload } = req;        
        return UsersDao.update(id, payload);
    }

    async delete(req, h) {
        const { id } = req.params;
        await UsersDao.delete(id);

        return h.response().code(NO_CONTENT);
    }
}

export default new UsersController();