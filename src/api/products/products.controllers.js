import { CREATED, NO_CONTENT } from 'http-status';

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
    let { params: { categoryId }, query } = req;
    let params = { category_id: categoryId };

    return ProductsDao.list({ params , query });
  }

  async detail(req, h) {
    let { params: { id, categoryId }, query } = req;
    let params = { id, category_id: categoryId };

    return ProductsDao.detail({ params , query });
  }

  async update(req, h) {
    let { params: { id, categoryId }, payload } = req;
    let params = { id, category_id: categoryId };

    const {
        description, 
        quantity,
        price,
        category 
    } = await ProductsDao.update(payload, { params });

    return h.response({ id, description, quantity, price, category });
  }

  async destroy(req, h) {
    let { params: { id, categoryId } } = req;
    let params = { id, category_id: categoryId };

    await ProductsDao.destroy({ params });

    return h.response().code(NO_CONTENT);
  }
}

export default new ProductsControllers();
