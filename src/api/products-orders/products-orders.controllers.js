import { CREATED, OK, NO_CONTENT } from 'http-status';

import ProductsOrdersDao from './products-orders.dao';
import ProductsOrdersBusiness from './products-orders.business';

class ProductsOrdersController {
  async create(req, h) {
    const { orderId } = req.params;
    const { payload } = req;

    const productsOrder = await ProductsOrdersBusiness.create(payload, orderId);

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

  async delete(req, h) {
    const { orderId, productId } = req.params;
    await ProductsOrdersBusiness.delete(orderId, productId);

    return h.response().code(NO_CONTENT);
  } 
}

export default new ProductsOrdersController();
