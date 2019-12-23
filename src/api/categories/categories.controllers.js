import { CREATED, NO_CONTENT } from 'http-status';
import CategoriesDao from './categories.dao';

class CategoriesController {
  async list(req, h) {
    return CategoriesDao.findAll();
  }

  async detail(req, h) {
    const { id } = req.params;
    return CategoriesDao.findById(id);
  }

  async create(req, h) {
    const { payload } = req;
    const category = await CategoriesDao.create(payload);

    return h.response(category).code(CREATED);
  }

  async update(req, h) {
    const {
      params: { id },
      payload,
    } = req;
    return CategoriesDao.update(id, payload);
  }

  async delete(req, h) {
    const { id } = req.params;
    await CategoriesDao.delete(id);

    return h.response().code(NO_CONTENT);
  }
}

export default new CategoriesController();
