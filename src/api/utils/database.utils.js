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
        let queryOptions = this._builderQueryOptions(options);
        let paginate = this._paginate(options.query);
    
        try {
            const records = await model.findAll({ ...queryOptions, ...paginate });
            return { meta: { ...paginate, recordCount: records.length }, records };
    
        } catch (error) {
            throw Boom.badRequest(`${error.original.sqlMessage}, check spaces and name column!`);
        }     
    }

    async findOne(model, options) {
        let queryOptions = this._builderQueryOptions(options);
        let object = null;

        try {
            object = await model.findOne({ ...queryOptions });
        } catch (error) {
            throw Boom.badRequest(`${error.original.sqlMessage}, check spaces and name column!`);
        }     

        if (!object) {
            throw Boom.notFound();
        }
        
        return object;
    }

    async create(model, data) {
        try {
            const object = await model.create(data);
            return object;
        } catch (error) {
            this._customMensagemError(error);
        }
    }

    async update(model, data) {
        try {
            const object = await model.update(data);
            return object;
        } catch (error) {
            this._customMensagemError(error);
        }
    }

    _includeProps(queryOptions, options) {
        let props = {};
        
        if ('props' in options ) {
            props = { ...options.props };

            if (('attributes' in queryOptions) && ('attributes' in options.props)) {
                props.attributes =  queryOptions.attributes;
            }

            return { ...queryOptions, ...props };
        }

        return queryOptions 
    }
    
    _builderQueryOptions(options) {
        let { params, query } = options;
        let queryOptions = {};
        let where = {};

        query = query || {};
        
        for (let filter in query) {
            if (filter === 'fields') {
                queryOptions['attributes'] = query[filter].split(",");
            } else if (filter.search('_contains') !== -1) {
                where = this._filterContains(where, filter, query[filter]);
            } else if (filter.search('_in') !== -1) {
                where = this._filterIn(where, filter, query[filter]);
            } else if (filter === 'sort') {
                queryOptions['order'] = this._sort(query[filter]);
            }
        }
        
        where = { ...where, ...params };
        queryOptions = this._includeProps(queryOptions, options);
    
        return { ...queryOptions, where };
    }

    _sort(value) {
        let order = [];

        value.split(',').map((field, index) => {
            let typeOrder = 'ASC';

            if (field.charAt(field.length - 1) === '-') {
                typeOrder = 'DESC';
                field = field.substr(0, field.length - 1)
            }

            order[index] = [field, typeOrder];
        });

        return order;
    }

    _paginate(queryParams) {
        let limit = parseInt(queryParams.limit) || 50;
        let offset = parseInt(queryParams.offset) || 0;

        limit = limit > 50 ? 50 : limit;
        offset = offset > 50 ? 50 : offset;

        return { offset, limit };
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

    _customMensagemError(error) {
        let msgError = '';
            
        error.errors.map(validation => {
            if (validation.constructor.name === 'ValidationErrorItem') {
                msgError += `${validation.message},`;
            }
            msgError = msgError.substr(0, (msgError.length - 1));
        });

        throw Boom.badRequest(msgError);
    }
}

export default new DatabaseUtils();