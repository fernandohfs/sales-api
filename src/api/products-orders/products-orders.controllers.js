import { CREATED, OK } from 'http-status';

import ProductsOrdersDao from './products-orders.dao';
import ProductsOrdersBusiness from './products-orders.business';

class ProductsOrdersController {
  async create(req, h) {
    const { orderId } = req.params;
    const { payload } = req;

    /**
     * Execute handle product function
     */
    const { products } = payload;

    await ProductsOrdersBusiness.handleProduct(products, orderId);

    const productsOrder = await ProductsOrdersDao.create(payload, orderId);

    return h.response(productsOrder).code(CREATED);
  }

  async update(req, h) {
    const { orderId, productId } = req.params;
    const { payload } = req;

    /**
     * Execute handle product function
     */

    const products = [
      {
        id: productId,
        quantity: payload.quantity,
      },
    ];

    await ProductsOrdersBusiness.handleProduct(products, orderId);

    const product = await ProductsOrdersDao.update(payload, orderId, productId);

    return h.response(product).code(OK);
  }
}

export default new ProductsOrdersController();
