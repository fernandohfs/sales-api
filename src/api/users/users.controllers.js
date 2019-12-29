import { CREATED, NO_CONTENT } from 'http-status';
import UsersDao from './users.dao';

class UsersController {
    async list(req, h) {
        return UsersDao.findAll();
    }

    async detail(req, j) {
        const { id } = req.params;
        return UsersDao.findById(id);
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

    async login(req, h) {
        return 'login';
    }
}

export default new UsersController();