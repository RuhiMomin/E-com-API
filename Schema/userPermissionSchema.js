let { sequelizeCon, Model, DataTypes,Op } = require('../Init/dbconfig')
class UserPermission extends Model { }
UserPermission.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    permission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, { tableName: 'userpermission', ModelName: 'UserPermission', sequelize: sequelizeCon });
module.exports = { UserPermission } ;