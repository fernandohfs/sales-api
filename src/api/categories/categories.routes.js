import CategoriesController from './categories.controllers';
import * as Schemas from './categories.schemas';
import { failAction } from '../utils/error.utils';

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
      validate: {
        query: Schemas.queryList,
        failAction
      },
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
        query: Schemas.queryDetail,
        failAction
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
        failAction
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
        failAction
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
        failAction
      },
    },
  },
];
