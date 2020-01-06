import { instances } from 'hapi-sequelizejs';
import UsersDao from '../users/users.dao';
import DatabaseUtils from '../utils/database.utils';

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

  async findAll(options) {
    return DatabaseUtils.findAll(this.model, { ...options, props: this.props });
  }

  async findOne(options) {
    return DatabaseUtils.findOne(this.model, { ...options, props: this.props });
  }

  async create(userId) {
    await UsersDao.findOne({ params: { id: userId } });
    return this.model.create({ user_id: userId });
  }

  async update(options, data) {
    const order = await this.findOne(options);

    return order.update(data);
  }

  async destroy(options) {
    const order = await this.findOne(options);

    return order.destroy();
  }
}

export default new OrdersDao();
