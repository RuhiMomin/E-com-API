let { Cart } = require('../Schema/cartschema')
let { Product } = require('../Schema/productSchema')
let { User } = require('../Schema/userSchema')
let joi = require('joi')

async function checkC(data) {
    let schema = joi.object({
        productID: joi.number().required(),
        qty: joi.number().required(),
    })

    let valid = await schema.validateAsync(data, { abortEarly: false }).catch((error) => {
        return { error }
    })
    if (!valid || (valid && valid.error)) {
        let msg = []
        for (let i of valid.error.details) {
            msg.push(i.message)
        }
        return { error: msg }
    }
    return { data: valid }
}

async function create(id, params, userData) {
    params.productID = id
    let valid = await checkC(params).catch((error) => {                                          //validation
        return { error }
    })
    if (!valid || (valid && valid.error)) {
        return { error: valid.error }
    }
    let cartData = {                                                  //fomat
        productID: params.productID,
        userID: userData.id,
        qty: params.qty,
    }
    let findProduct = await Product.findOne({ where: { id: cartData.productID } }).catch((error) => {
        return { error }
    })
    if (!findProduct || (findProduct & findProduct.error)) {                   // find product in db
        return { error: "product not found" }
    }
    let findUser = await User.findOne({ where: { id: cartData.userID } }).catch((error) => {
        return { error }                                //find user if exist
    })
    if (!findUser || (findUser && findUser.error)) {
        return { error: "user not found" }
    }
    // console.log(findProduct)
    // if (cartData.qty > findProduct.quantity) {
    //     return { error: "product out of stock" }
    // }
    cartData.totalAmount = cartData.qty * findProduct.price
    let data = await Cart.create(cartData).catch((error) => {
        return { error }
    })
    if (!data || (data && data.error)) {
        console.log("this error from line 58", data)
        return { error: "error creating new cart" }
    }
    return { data: data }
}

async function viewAll(userData) {
    let data = await Cart.findAll({ where: { userID: userData.id } }).catch((error) => {
        return { error }
    })
    if (!data || (data && data.error)) {
        return { error: "Cart not found" }
    }
    return { data }
}

async function checkUpdate(data) {
    let schema = joi.object({
        qty: joi.number().required()
    })
    let valid = await schema.validateAsync(data).catch((error) => {
        return { error }
    })
    if (!valid || (valid && valid.error)) {
        let msg = []
        for (let i of valid.error.details) {
            msg.push(i.message)
        }
        return { error: msg }
    }
    return { data: valid }

}
async function update(id, params, userData) {
    let valid = await checkUpdate(params).catch((error) => {
        return { error }                                       //validate
    })
    if (!valid || (valid && valid.error)) {
        return { error: valid.error }
    }
    let findCart = await Cart.findOne({ where: { id } }).catch((error) => {
        return { error }                          //find cart in cart table
    })
    if (!findCart || (findCart && findCart.error)) {
        return { error: "cart not found" }
    }
    let findProduct = await Product.findOne({ where: { id: findCart.productID } }).catch((error) => {
        return { error }                   //find product  in product table
    })
    if (!findProduct || (findProduct && findProduct.error)) {
        return { error: "product not found" }
    }
    if (params.qty >= findProduct.quantity) {
        return { error: "product out of stock" }             //condition
    }
    let findUser = await User.findOne({ where: { id: userData.id }, raw: true }).catch((error) => {
        return { error }
    })
    console.log(findUser, "woooo");                                               //find user in cart
    if (!findUser || (findUser && findUser.error)) {
        return { error: "user not found" }
    }

    console.log(findProduct)
    let data = {                                  //data format
        qty: params.qty,
        totalAmount: params.qty * findProduct.price
    }
    console.log(data, "data");
    let upCart = await Cart.update(data, { where: { id: findCart.id } }).catch((error) => {
        return { error }                      //update the cart with update method
    })
    if (!upCart || (upCart && upCart.error)) {
        return { error: "cant update" }
    }
    return { data }                    // return data
}

async function cartDelete(id, userData) {
    let findCart = await Cart.findOne({ where: { id } }).catch((error) => {
        return { error }
    })
    if (!findCart || (findCart && findCart.error)) {
        return { error: "Cart not found" }
    }
    let findUser = await User.findOne({ where: { id: userData.id } }).catch((error) => {
        return { error }
    })
    if (!findUser || (findUser && findUser.error)) {
        return { error: "User not found" }
    }
    if (findUser.id != findCart.userID) {
        return { error: "unauthorized" }
    }
    let data = await Cart.destroy({ where: { id } }).catch((error) => {
        return { error }
    })
    if (!data || (data && data.error)) {
        return { error: "cant delete" }
    }
    return { data: "Cart Delete" }
}
module.exports = { create, viewAll, update, cartDelete }


//body otp n new password
//params email   is req.body