import { CREATED, NO_CONTENT } from 'http-status';
import OrdersDao from './orders.dao';

class OrdersController {
  async list(req, h) {
    let { params: { userId }, query } = req;
    let params = { user_id: userId };

    return OrdersDao.findAll({ params, query });
  }

  async detail(req, h) {
    let { params: { userId, orderId }, query } = req;
    let params = { user_id: userId, id: orderId };

    return OrdersDao.findOne({ params , query });
  }

  async create(req, h) {
    const { userId } = req.params;

    const { id, user_id } = await OrdersDao.create(userId);

    return h.response({ id, user_id }).code(CREATED);
  }

  async update(req, h) {
    let { params: { userId, orderId } } = req;
    let params = { user_id: userId, id: orderId };

    return OrdersDao.update({ params }, payload);
  }

  async destroy(req, h) {
    let { params: { userId, orderId } } = req;
    let params = { user_id: userId, id: orderId };

    await OrdersDao.destroy({ params });

    return h.response().code(NO_CONTENT);
  }
}

export default new OrdersController();