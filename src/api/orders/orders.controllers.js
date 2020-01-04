import { CREATED, NO_CONTENT } from 'http-status';
import OrdersDao from './orders.dao';

class OrdersController {
  async list(req, h) {
    return OrdersDao.findAll();
  }

  async detail(req, h) {
    const { id } = req.params;
    return OrdersDao.findById(id);
  }

  async create(req, h) {
    const { userId } = req.params;

    const { id, user_id } = await OrdersDao.create(userId);

    return h.response({ id, user_id }).code(CREATED);
  }

  async update(req, h) {
    const {
      params: { id },
      payload,
    } = req;
    return OrdersDao.update(id, payload);
  }

  async destroy(req, h) {
    const { id } = req.params;
    await OrdersDao.destroy(id);

    return h.response().code(NO_CONTENT);
  }
}

export default new OrdersController();
