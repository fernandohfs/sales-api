import CategoriesController from './categories.controllers';
import * as Schemas from './categories.schemas';

const basePath = '/categories';

export default [
  {
    method: 'GET',
    path: basePath,
    handler: CategoriesController.list
  },
  {
    method: 'GET',
    path: `${basePath}/{id}`,
    handler: CategoriesController.detail,
    config: {
      validate: {
        params: Schemas.detail,
      },
    },
  },
  {
    method: 'POST',
    path: basePath,
    handler: CategoriesController.create,
    config: {
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
      validate: {
        params: Schemas.detail,
        payload: Schemas.payload,
      },
    },
  },
  {
    method: 'DELETE',
    path: `${basePath}/{id}`,
    handler: CategoriesController.delete,
    config: {
      validate: {
        params: Schemas.detail,
      },
    },
  },
];
