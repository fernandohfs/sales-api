import { instances } from 'hapi-sequelizejs';

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
}

export default new ProductsOrdersDao();
