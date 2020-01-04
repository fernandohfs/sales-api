import Boom from '@hapi/boom';

import ProductsDao from '../products/products.dao';

class ProductsOrdersBusiness {
  async checkProductAvailability({ products }) {
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
    }
  }

  async _updateProductQuantity(newQuantity, productId) {
    await ProductsDao.update({ quantity: newQuantity }, productId, null);
  }
}

export default new ProductsOrdersBusiness();
