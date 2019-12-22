import { Model, DataTypes } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Category extends Model {}
    Category.init({
        description: DataTypes.STRING,
        createdAt: { field: 'created_at', type: DataTypes.DATE },
        updatedAt: { field: 'updated_at', type: DataTypes.DATE }
    }, { sequelize, modelName: 'Category' });

    return Category;
}