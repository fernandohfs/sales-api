import CategoriesController from './categories.controllers';
import * as Schemas from './categories.schemas';

const basePath = '/categories';

export default [
  {
    method: 'GET',
    path: basePath,
    handler: CategoriesController.list,
    config: {
      description: 'Get Categories',
      notes: 'Retruns a list categories',
      tags: ['api', 'categories'],
    },
  },
  {
    method: 'GET',
    path: `${basePath}/{id}`,
    handler: CategoriesController.detail,
    config: {
      description: 'Get Category',
      notes: 'Returns a category item by the id passed in the path',
      tags: ['api', 'categories'],
      validate: {
        params: Schemas.params,
      },
    },
  },
  {
    method: 'POST',
    path: basePath,
    handler: CategoriesController.create,
    config: {
      description: 'Post Category',
      notes: 'Create a category with data in request body',
      tags: ['api', 'categories'],
      plugins: {
        'hapi-swagger': {
          payloadType: 'form',
        },
      },
      validate: {
        payload: Schemas.payload,
      },
    },
  },
  {
    method: 'PUT',
    path: `${basePath}/{id}`,
    handler: CategoriesController.update,
    config: {
      description: 'Put Category',
      notes:
        'Update a category with data in request body by the id passed in the path',
      tags: ['api', 'categories'],
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
    method: 'DELETE',
    path: `${basePath}/{id}`,
    handler: CategoriesController.delete,
    config: {
      description: 'Put Category',
      notes: 'Delete a category by the id passed in the path',
      tags: ['api', 'categories'],
      validate: {
        params: Schemas.params,
      },
    },
  },
];
