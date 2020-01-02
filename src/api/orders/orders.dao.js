import { instances } from 'hapi-sequelizejs';
import Boom from '@hapi/boom';

class OrdersDao {
  constructor() {
    this.model = instances.getModel('Order');
  }

  async findAll() {
    return this.model.findAll();
  }

  async findById(id) {
    const order = await this.model.findByPk(id);

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
