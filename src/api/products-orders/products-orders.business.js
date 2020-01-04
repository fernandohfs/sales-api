import Boom from '@hapi/boom';

import ProductsDao from '../products/products.dao';
import OrdersDao from '../orders/orders.dao';

class ProductsOrdersBusiness {
  async checkProductAvailability({ products }, orderId) {
    for (const p of products) {
      const product = await ProductsDao.detail(p.id, null);

      if (product.quantity < p.quantity) {
        throw Boom.badRequest(
          `Product ID: ${p.id} has no quantity available. Please, check available quantity and try again.`
        );
      }

      /**
       * Update product quantity
       */
      const newQuantity = product.quantity - p.quantity;

      await this._updateProductQuantity(newQuantity, p.id);

      /**
       * Update order total
       */
      const total = product.price * p.quantity;

      await this._updateOrderTotal(orderId, total);
    }
  }

  async _updateProductQuantity(newQuantity, productId) {
    await ProductsDao.update({ quantity: newQuantity }, productId, null);
  }

  async _updateOrderTotal(orderId, total) {
    await OrdersDao.update(orderId, { total });
  }
}

export default new ProductsOrdersBusiness();
