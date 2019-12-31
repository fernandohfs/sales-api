import { instances } from 'hapi-sequelizejs';
import Boom from '@hapi/boom';
import DatabaseUtils from '../utils/database.utils';

class UsersDao {
    constructor() {
        this.model = instances.getModel('User');
    }

    async findAll(options) {
        return DatabaseUtils.findAll(this.model, options);
    }

    async findById(id) {
        const user = await this.model.findByPk(id);

        if (!user) {
            throw Boom.notFound();
        }

        return user;
    }

    async create(data) {
        return this.model.create(data);
    }

    async update(id, data) {
        const user = await this.findById(id);
        return user.update(data);
    }

    async delete(id) {
        const user = await this.findById(id);
        return user.destroy();
    }
}

export default new UsersDao();