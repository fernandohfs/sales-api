import * as Joi from '@hapi/joi';

class DocsUtils {
    constructor() {
        this.filter = {
            general: {
                fields: Joi.string().min(1),
                sort: Joi.string().min(1),
                limit: Joi.number(),
                offset: Joi.number()
            },
            specific: {
                contains: { suffix: '_contains', validate: Joi.string().min(1) }, 
                in: { suffix: '_in', validate: Joi.string().min(1) }
            }
        }
    }

    builderQueryParams(fields) {
        let queryParams = {},
            specific = this.filter.specific;

        for (let field of fields) {
            for (let filter in specific) {
                let spec = specific[filter],
                    filterKey = `${field}${spec.suffix}`;

                queryParams[filterKey] = spec.validate;
            }
        }

        return { ...this.filter.general, ...queryParams };
    }
}

export default new DocsUtils();