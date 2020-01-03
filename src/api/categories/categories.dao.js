import { instances } from 'hapi-sequelizejs';
import DatabaseUtils from '../utils/database.utils';

class CategoriesDao {
  constructor() {
    this.model = instances.getModel('Category');
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
    const category = await this.findOne(options);
    return DatabaseUtils.update(category, data);
  }

  async delete(options) {
    const category = await this.findOne(options);
    return category.destroy();
  }
}

export default new CategoriesDao();
