import { instances } from 'hapi-sequelizejs';
import Boom from '@hapi/boom';

class ProductsDao {
  constructor() {
    this.model = instances.getModel('Product');
    this.categoryModel = instances.getModel('Category');
  }

  create(data, categoryId) {
    return this.model.create({ ...data, category_id: categoryId });
  }

  list(where) {
    return this.model.findAll({
      where,
      attributes: ['id', 'description', 'quantity', 'price'],
    });
  }

  async detail(id, categoryId) {
    const product = await this.model.findOne({
      where: { id, category_id: categoryId },
      include: [
        {
          model: this.categoryModel,
          as: 'category',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
      attributes: { exclude: ['category_id', 'createdAt', 'updatedAt'] },
    });

    if (!product) {
      throw Boom.notFound('Product not found');
    }

    return product;
  }
}

export default new ProductsDao();
