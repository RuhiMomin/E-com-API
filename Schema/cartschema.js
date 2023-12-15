let { Model, QueryTypes, Op, DataTypes, sequelizeCon } = require("../Init/dbconfig")
class Cart extends Model { }

Cart.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    productID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalAmount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, { tableName: "cart", modelName: "Cart", sequelize: sequelizeCon })

module.exports = {
    Cart
}