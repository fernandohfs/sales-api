import { Model } from 'sequelize';
import Bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) => {
    class User extends Model {};

    User.init({
        name: DataTypes.STRING,
        cpf_cnpj: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    }, { sequelize, modelName: 'User' });

    User.addHook('beforeCreate', async (user) => {
        const hash = await Bcrypt.hash(user.password, 10);
        user.password = hash;
    });

    return User;
}