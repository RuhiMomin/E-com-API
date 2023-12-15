let { sequelizeCon, Model, DataTypes } = require('../Init/dbconfig')
class User extends Model { }
User.init({
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // otp: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    // },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    token: {
        type: DataTypes.STRING(500),     //varchar 500
        allowNull: true,
    },
}, { tableName: 'user', ModelName: 'user', sequelize: sequelizeCon });
module.exports = { User } 