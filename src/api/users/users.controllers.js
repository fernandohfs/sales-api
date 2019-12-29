import { CREATED, NO_CONTENT } from 'http-status';
import UsersDao from './users.dao';

class UsersController {
    async list(req, h) {
        return 'list';
    }

    async detail(req, j) {
        return 'detail';
    }

    async create(req, h) {
        return 'create';
    }

    async update(req, h) {
        return 'update';
    }

    async delete(req, h) {
        return 'delete';
    }

    async login(req, h) {
        return 'login';
    }
}

export default new UsersController();