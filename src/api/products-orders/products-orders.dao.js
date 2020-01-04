import { instances } from 'hapi-sequelizejs';
import Boom from '@hapi/boom';

class ProductsOrdersDao {
  constructor() {
    this.model = instances.getModel('ProductOrder');
  }

  async create({ products }, orderId) {
    const results = [];

    for (const product of products) {
      const result = await this.model.create({
        product_id: product.id,
        order_id: orderId,
        quantity: product.quantity,
      });

      results.push(result);
    }

    return results;
  }

  async update(data, orderId, productId) {
    const productOrder = await this.model.findOne({
      where: { order_id: orderId, product_id: productId },
    });

    if (!productOrder) {
      throw Boom.notFound('Product Order not found');
    }

    return productOrder.update(data);
  }
}

export default new ProductsOrdersDao();
