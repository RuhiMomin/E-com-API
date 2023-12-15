let express = require('express');     //api routing
let routes = express.Router();

let authMid = require('./Middleware/authMiddleware');
let product = require('./Controller/product')
let auth = require('./Controller/authController')
let cart = require('./Controller/cartcontroller')

routes.post('/register', auth.userRegister)
routes.post('/Login', auth.userLogin)

//PRODUCT.....product
routes.post('/product/create', authMid.authM('product_create'), product.createProduct)
routes.get('/product', authMid.authM('product_view'), product.viewAll)
routes.get('/product/:id', authMid.authM('product_viewDetails'), product.viewDetails)
routes.post('/product/update/:id', authMid.authM('product_update'), product.update)
routes.post('/product/delete/:id', authMid.authM('product_delete'), product.pDelete)
routes.post('/product/restore/:id', authMid.authM('product_restore'), product.restore)


//CART.....cart
routes.post('/cart/create/:productID', authMid.authM('cart_create'), cart.create)
routes.get('/cart', authMid.authM('cart_view'), cart.viewAll)
routes.post('/cart/update/:id', authMid.authM('cart_update'), cart.update)
routes.delete('/cart/delete/:id', authMid.authM('cart_delete'), cart.cartDelete)

module.exports = { routes }     