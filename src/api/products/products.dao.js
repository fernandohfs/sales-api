import { instances } from 'hapi-sequelizejs';

class ProductsDao {
  constructor() {
    this.model = instances.getModel('Product');
  }

  create(data, categoryId) {
    return this.model.create({ ...data, category_id: categoryId });
  }
}

export default new ProductsDao();
