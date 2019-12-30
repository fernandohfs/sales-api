import { Model } from 'sequelize';
import Bcrypt from 'bcryptjs';
import Boom from '@hapi/boom';
import UserType from '../collections/userType.collections';

export default (sequelize, DataTypes) => {
    class User extends Model {};

    User.init({
        name: DataTypes.STRING,
        cpf_cnpj: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        type: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            get() {
                return UserType.get(this.getDataValue('type'));
            },
            set(type) {
                if (typeof type === "object") {
                    type = type.id;
                }

                if (!UserType.get(type)) {
                    throw Boom.badRequest('invalid value in type field ');
                }

                this.setDataValue('type', type);
            }
        }
    }, { sequelize, modelName: 'User' });

    User.addHook('beforeCreate', async (user) => {
        const hash = await Bcrypt.hash(user.password, 10);
        user.password = hash;
    });

    return User;
}