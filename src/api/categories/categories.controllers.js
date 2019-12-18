class CategoriesController {
    list(req, h) {
        return 'list';
    }

    details(req, h) {
        return 'details';
    }

    create(req, h) {
        return 'create';
    }

    update(req, h) {
        return 'update';
    }

    delete(req, h) {
        return 'delete';
    }
}

export default new CategoriesController();