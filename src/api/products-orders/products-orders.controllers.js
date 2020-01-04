import { CREATED } from 'http-status';

import ProductsOrdersDao from './products-orders.dao';
import ProductsOrdersBusiness from './products-orders.business';

class ProductsOrdersController {
  async create(req, h) {
    const { orderId } = req.params;
    const { payload } = req;

    /**
     * Checks if product is available
     */
    await ProductsOrdersBusiness.checkProductAvailability(payload);

    const productsOrder = await ProductsOrdersDao.create(payload, orderId);

    return h.response(productsOrder).code(CREATED);
  }
}

export default new ProductsOrdersController();
