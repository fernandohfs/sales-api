import { CREATED } from 'http-status';

import ProductsOrdersDao from './products-orders.dao';

class ProductsOrdersController {
  async create(req, h) {
    const { orderId } = req.params;
    const { payload } = req;

    const productsOrder = await ProductsOrdersDao.create(payload, orderId);

    return h.response(productsOrder).code(CREATED);
  }
}

export default new ProductsOrdersController();
