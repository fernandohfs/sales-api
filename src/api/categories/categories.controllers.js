import { CREATED, NO_CONTENT } from 'http-status';
import CategoriesDao from './categories.dao';

class CategoriesController {
  async list(req, h) {
    const { params, query } = req;
    return CategoriesDao.findAll({ params, query });
  }

  async detail(req, h) {
    const { params, query } = req;
    return CategoriesDao.findOne({ params, query } );
  }

  async create(req, h) {
    const { payload } = req;
    const category = await CategoriesDao.create(payload);

    return h.response(category).code(CREATED);
  }

  async update(req, h) {
    const { params, payload } = req;
    return CategoriesDao.update({ params }, payload);
  }

  async delete(req, h) {
    const { params } = req;
    await CategoriesDao.delete({ params });

    return h.response().code(NO_CONTENT);
  }
}

export default new CategoriesController();
