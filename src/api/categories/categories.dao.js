import { instances } from 'hapi-sequelizejs';
import Boom from '@hapi/boom';

class CategoriesDao {
  constructor() {
    this.model = instances.getModel('Category');
  }

  async findAll() {
    return this.model.findAll();
  }

  async findById(id) {
    const category = await this.model.findByPk(id);

    if (!category) {
      throw Boom.notFound();
    }

    return category;
  }

  async create(data) {
    return this.model.create(data);
  }

  async update(id, data) {
    const category = await this.findById(id);
    return category.update(data);
  }

  async delete(id) {
    const category = await this.findById(id);
    return category.destroy();
  }
}

export default new CategoriesDao();
