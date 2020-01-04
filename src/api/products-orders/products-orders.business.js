import Boom from '@hapi/boom';

import ProductsDao from '../products/products.dao';

class ProductsOrdersBusiness {
  async checkProductAvailabilty({ products }) {
    for (const p of products) {
      const product = await ProductsDao.detail(p.id, null);

      if (product.quantity < p.quantity) {
        throw Boom.badRequest(
          `Product ID: ${p.id} has no quantity available. Please, check available quantity and try again.`
        );
      }
    }
  }
}

export default new ProductsOrdersBusiness();
