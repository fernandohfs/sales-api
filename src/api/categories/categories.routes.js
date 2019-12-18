import CategoriesController from './categories.controllers';

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
        handler: CategoriesController.details
    },
    {
        method: 'POST',
        path: basePath,
        handler: CategoriesController.create
    },
    {
        method: 'PUT',
        path: `${basePath}/{id}`,
        handler: CategoriesController.update
    },
    {
        method: 'DELETE',
        path: `${basePath}/{id}`,
        handler: CategoriesController.delete
    }
]