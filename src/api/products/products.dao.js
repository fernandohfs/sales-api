import { instances } from 'hapi-sequelizejs';

class ProductsDao {
  constructor() {
    this.model = instances.getModel('Product');
  }

  create(data, categoryId) {
    return this.model.create({ ...data, category_id: categoryId });
  }

  list(where) {
    return this.model.findAll({
      where,
      attributes: ['id', 'description', 'quantity', 'price'],
    });
  }
}

export default new ProductsDao();
