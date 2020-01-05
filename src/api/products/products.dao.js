import { instances } from 'hapi-sequelizejs';
import Boom from '@hapi/boom';
import DatabaseUtils from '../utils/database.utils';

class ProductsDao {
  constructor() {
    this.model = instances.getModel('Product');
    this.categoryModel = instances.getModel('Category');

    this.props = {
      include: [
        {
          model: this.categoryModel,
          as: 'category',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
      attributes: { exclude: ['category_id', 'createdAt', 'updatedAt'] },
    };
  }

  create(data, categoryId) {
    return this.model.create({ ...data, category_id: categoryId });
  }

  list(options) {
    return DatabaseUtils.findAll(this.model, { ...options, props: this.props });
  }

  async detail(options) {
    return DatabaseUtils.findOne(this.model, { ...options, props: this.props });
  }

  async update(data, options) {
    const product = await this.detail(options);

    return product.update(data);
  }

  async destroy(options) {
    const product = await this.detail(options);

    return product.destroy();
  }
}

export default new ProductsDao();
