import { CREATED } from 'http-status';

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
}

export default new ProductsControllers();
