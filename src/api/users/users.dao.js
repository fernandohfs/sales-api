import { instances } from 'hapi-sequelizejs';
import DatabaseUtils from '../utils/database.utils';

class UsersDao {
    constructor() {
        this.model = instances.getModel('User');
    }

    async findAll(options) {
        return DatabaseUtils.findAll(this.model, options);
    }

    async findOne(options) {
        return DatabaseUtils.findOne(this.model, options);
    }

    async create(data) {
        return await DatabaseUtils.create(this.model, data);
    }

    async update(options, data) {
        const user = await this.findOne(options);
        return DatabaseUtils.update(user, data);
    }

    async delete(options) {
        const user = await this.findOne(options);
        return user.destroy();
    }
}

export default new UsersDao();