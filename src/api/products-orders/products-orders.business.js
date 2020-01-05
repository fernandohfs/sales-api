import Boom from '@hapi/boom';

import ProductsDao from '../products/products.dao';
import ProductsOrdersDao from './products-orders.dao';
import OrdersDao from '../orders/orders.dao';

class ProductsOrdersBusiness {
  async handleProduct(products, orderId, isCreate=false) {
    for (const p of products) {
      let isCheck = true;
      let totalUpdate = null;
      const options = { params: { id : p.id } };

      const product = await ProductsDao.detail(options);
      const orderProduct = await ProductsOrdersDao.findOne(orderId, p.id);
    
     /**
      * Check if the product is already registered
      */
      if (isCreate && orderProduct) {
        throw Boom.badRequest(`Is product "${product.description}" is already registered`); 
      }

      /**
       * Check if product quantity is available
       */
      if (orderProduct) {
        isCheck = (orderProduct.quantity <= p.quantity) ? false : isCheck;
        
        totalUpdate = (product.price * p.quantity) - (product.price * orderProduct.quantity);
        p.quantity = p.quantity - orderProduct.quantity;
      }

      if (isCheck) {
        await this._checkProductAvailability(product.quantity, p);
      }

      /**
       * Update product quantity
       */
      const newQuantity = product.quantity - p.quantity;

      await this._updateProductQuantity(newQuantity, p.id);

      /**
       * Update order total
       */
      const total = (totalUpdate !== null) ? totalUpdate : product.price * p.quantity;

      await this._updateOrderTotal(orderId, total);
    }
  }

  async create(payload, orderId) {
    const { products } = payload;
    await this.handleProduct(products, orderId, true);

    return ProductsOrdersDao.create(payload, orderId);
  }

  async delete(orderId, productId) {
    const produtcsOptions = { params: { id : productId } };
    const orderProduct = await ProductsOrdersDao.findOne(orderId, productId);

    if (!orderProduct) {
        throw Boom.notFound();
    }

    const product = await ProductsDao.detail(produtcsOptions);

    //Update product quantity
    const newQuantity = product.quantity + orderProduct.quantity;
    await this._updateProductQuantity(newQuantity, productId);

    //Update order total
    const total = product.price * orderProduct.quantity;
    await this._updateOrderTotal(orderId, (-total));

    return orderProduct.destroy();
  }

  async _checkProductAvailability(originalQuantity, orderProduct) {
    if (originalQuantity < orderProduct.quantity) {
      throw Boom.badRequest(
        `Product ID: ${orderProduct.id} has no quantity available. Please, check available quantity and try again.`
      );
    }
  }

  async _updateProductQuantity(newQuantity, productId) {
    const options = { params: { id: productId } };

    await ProductsDao.update({ quantity: newQuantity }, options);
  }

  async _updateOrderTotal(orderId, total) {
    const options = { params: { id: orderId } };
    const orders = await OrdersDao.findOne(options);

    total = parseFloat(orders.total) + total;

    await OrdersDao.update(options, { total });
  }
}

export default new ProductsOrdersBusiness();
