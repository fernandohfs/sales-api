import Boom from '@hapi/boom';

import ProductsDao from '../products/products.dao';
import OrdersDao from '../orders/orders.dao';

class ProductsOrdersBusiness {
  async handleProduct(products, orderId) {
    for (const p of products) {
      const product = await ProductsDao.detail(p.id, null);

      /**
       * Check if product quantity is available
       */

      await this._checkProductAvailability(product.quantity, p);

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

  async _checkProductAvailability(originalQuantity, orderProduct) {
    if (originalQuantity < orderProduct.quantity) {
      throw Boom.badRequest(
        `Product ID: ${orderProduct.id} has no quantity available. Please, check available quantity and try again.`
      );
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
