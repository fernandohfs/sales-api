import { instances } from 'hapi-sequelizejs';
import Boom from '@hapi/boom';

class OrdersDao {
  constructor() {
    this.model = instances.getModel('Order');
    this.productOrderModel = instances.getModel('ProductOrder');
    this.productModel = instances.getModel('Product');

    this.props = {
      include: [
        {
          model: this.productOrderModel,
          as: 'product_order',
          attributes: {
            exclude: ['product_id', 'order_id', 'createdAt', 'updatedAt'],
          },
          include: [
            {
              model: this.productModel,
              as: 'product',
              attributes: { exclude: ['createdAt', 'updatedAt'] },
            },
          ],
        },
      ],
      attributes: { exclude: ['user_id', 'createdAt', 'updatedAt'] },
    };
  }

  async findAll() {
    return this.model.findAll(this.props);
  }

  async findById(id) {
    const order = await this.model.findByPk(id, this.props);

    if (!order) {
      throw Boom.notFound();
    }

    return order;
  }

  async create(userId) {
    return this.model.create({ user_id: userId });
  }

  async update(id, data) {
    const order = await this.findById(id);

    return order.update(data);
  }

  async destroy(id) {
    const order = await this.findById(id);

    return order.destroy();
  }
}

export default new OrdersDao();
