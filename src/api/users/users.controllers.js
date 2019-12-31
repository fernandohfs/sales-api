import { CREATED, NO_CONTENT } from 'http-status';
import UsersBusiness from './users.business';

class UsersController {
    async list(req, h) {
        return UsersBusiness.findAll(req);
    }

    async detail(req, h) {
        return UsersBusiness.findById(req);
    }

    async login(req, h) {
        return UsersBusiness.login(req);
    }

    async create(req, h) {
        const user = await UsersBusiness.create(req);        
        return h.response(user).code(CREATED);
    }

    async update(req, h) {      
        return UsersBusiness.update(req);
    }

    async delete(req, h) {
        await UsersBusiness.delete(req);
        return h.response().code(NO_CONTENT);
    }
}

export default new UsersController();