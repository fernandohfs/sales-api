import ProductsControllers from './products.controllers';
import * as Schemas from './products.schemas';

const basePath = '/categories/{categoryId}/products';

export default [
  {
    method: 'POST',
    path: basePath,
    handler: ProductsControllers.create,
    config: {
      description: 'Post Product',
      notes: 'Create a product with data in request body',
      tags: ['api', 'products'],
      plugins: {
        'hapi-swagger': {
          payloadType: 'form',
        },
      },
      validate: {
        params: Schemas.params,
        payload: Schemas.payload,
      },
    },
  },
  {
    method: 'GET',
    path: basePath,
    handler: ProductsControllers.list,
    config: {
      description: 'Get Products',
      notes: 'Retruns a list products',
      tags: ['api', 'products'],
      validate: {
        params: Schemas.params,
        query: Schemas.queryList
      },
    },
  },
  {
    method: 'GET',
    path: `${basePath}/{id}`,
    handler: ProductsControllers.detail,
    config: {
      description: 'Get Product',
      notes: 'Returns a product item by the id passed in the path',
      tags: ['api', 'products'],
      validate: {
        params: Schemas.detail,
        query: Schemas.queryDetail
      },
    },
  },
  {
    method: 'PUT',
    path: `${basePath}/{id}`,
    handler: ProductsControllers.update,
    config: {
      description: 'Put Product',
      notes:
        'Update a product with data in request body by the id passed in the path',
      tags: ['api', 'products'],
      plugins: {
        'hapi-swagger': {
          payloadType: 'form',
        },
      },
      validate: {
        params: Schemas.detail,
        payload: Schemas.update,
      },
    },
  },
  {
    method: 'DELETE',
    path: `${basePath}/{id}`,
    handler: ProductsControllers.destroy,
    config: {
      description: 'Put Product',
      notes: 'Delete a product by the id passed in the path',
      tags: ['api', 'products'],
      validate: {
        params: Schemas.detail,
      },
    },
  },
];
