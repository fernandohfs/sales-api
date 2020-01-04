import { instances } from 'hapi-sequelizejs';
import Boom from '@hapi/boom';

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

  list(where) {
    return this.model.findAll({
      where,
      ...this.props,
    });
  }

  async detail(id, categoryId) {
    let where = { id };

    if (categoryId) {
      where = { ...where, category_id: categoryId };
    }

    const product = await this.model.findOne({ where, ...this.props });

    if (!product) {
      throw Boom.notFound('Product not found');
    }

    return product;
  }

  async update(data, id, categoryId) {
    const product = await this.detail(id, categoryId);

    return product.update(data);
  }

  async destroy(id, categoryId) {
    const product = await this.detail(id, categoryId);

    return product.destroy();
  }
}

export default new ProductsDao();
