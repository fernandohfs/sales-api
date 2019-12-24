import { CREATED, NO_CONTENT } from 'http-status';
import { Op } from 'sequelize';

import ProductsDao from './products.dao';

class ProductsControllers {
  async create(req, h) {
    const { payload } = req;
    const { categoryId } = req.params;

    const { id, description, quantity, price } = await ProductsDao.create(
      payload,
      categoryId
    );

    return h
      .response({
        id,
        description,
        quantity,
        price,
      })
      .code(CREATED);
  }

  async list(req, h) {
    const { categoryId } = req.params;
    const { description } = req.query;

    let where = {
      category_id: categoryId,
    };

    if (description) {
      where = {
        ...where,
        description: {
          [Op.substring]: description,
        },
      };
    }

    const products = await ProductsDao.list(where);

    return h.response(products);
  }

  async detail(req, h) {
    const { id, categoryId } = req.params;

    const product = await ProductsDao.detail(id, categoryId);

    return h.response(product);
  }

  async update(req, h) {
    const {
      params: { id, categoryId },
      payload,
    } = req;

    const { description, quantity, price, category } = await ProductsDao.update(
      payload,
      id,
      categoryId
    );

    return h.response({ id, description, quantity, price, category });
  }

  async destroy(req, h) {
    const { id, categoryId } = req.params;

    await ProductsDao.destroy(id, categoryId);

    return h.response().code(NO_CONTENT);
  }
}

export default new ProductsControllers();
