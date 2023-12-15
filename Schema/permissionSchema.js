let { sequelizeCon, Model, DataTypes, Op } = require("../Init/dbconfig")
class permission extends Model { }
permission.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { tableName: "permission", modelName: "Permission", sequelize: sequelizeCon });

module.exports = { permission }
