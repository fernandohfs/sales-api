import Boom from '@hapi/boom';
import { Op } from 'sequelize';

class DatabaseUtils {
    async getObjectOr404(model, options) {
        const object = await model.findOne(options);
    
        if (!object) {
            throw Boom.notFound('Object does not exist');
        }
    
        return object;
    }

    async findAll(model, options) {
        const { query } = options;
        const queryOptions = this._builderQueryOptions(query);
    
        try {
            return await model.findAll(queryOptions);   
        } catch (error) {
            throw Boom.badRequest(error.original.sqlMessage);
        }     
    }
    
    _builderQueryOptions(queryParams) {
        let queryOptions = {};
        let where = {};
    
        Object.keys(queryParams).map(filter => { 
            if (filter === "fields") {
                queryOptions["attributes"] = queryParams[filter].split(",");
            } else if (filter.search("_contains") !== -1) {
                where = this._filterContains(where, filter, queryParams[filter]);
            } else if (filter.search("_in")) {
                where = this._filterIn(where, filter, queryParams[filter]);
            }
        });
    
        return { ...queryOptions, where };
    }
    
    _filterIn(where, filter, value) {
        let field = this._getField(filter, '_in');
        where[field] = { [Op.in]: value.split(',')};
    
        return where;
    }
    
    _filterContains(where, filter, value) {
        let field = this._getField(filter, '_contains');    
        where[field] = { [Op.like]: `%${value}%`};
    
        return where;
    }
    
    _getField(filter, name) {
        return filter.replace(name, '');
    }
}

export default new DatabaseUtils();