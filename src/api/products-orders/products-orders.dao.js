import { instances } from 'hapi-sequelizejs';

class ProductsOrdersDao {
  constructor() {
    this.model = instances.getModel('ProductOrder');
  }

  create({ products }, orderId) {
    const result = products.map(({ id, quantity }) => {
      return this.model.create({ product_id: id, order_id: orderId, quantity });
    });

    return result;
  }
}

export default new ProductsOrdersDao();
