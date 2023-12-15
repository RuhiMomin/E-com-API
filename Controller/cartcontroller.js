let cartModel = require('../Model/cartModel')
async function create(req, res) {
    let modelData = await cartModel.create(req.params.productID, req.body, req.userData).catch((error) => {
        return { error }
    })
    console.log(modelData, "weeeee");
    if (!modelData || (modelData && modelData.error)) {
        let error = (modelData && modelData.error) ? modelData.error : "internal server error"
        return res.send({ error })
    }
    return res.send({ data: modelData.data })
}

async function viewAll(req, res) {
    let modelData = await cartModel.viewAll(req.userData).catch((error) => {
        return { error }
    })
    if (!modelData || (modelData && modelData.error)) {
        let error = (modelData && modelData.error) ? modelData.error : "internal server error"
        return res.send({ error })
    }
    return res.send({ data: modelData.data })
}

async function update(req, res) {
    console.log("this is update", req.body)
    let modelData = await cartModel.update(req.params.id, req.body, req.userData).catch((error) => {
        return { error }
    })
    console.log(modelData, "model",);
    if (!modelData || (modelData && modelData.error)) {
        let error = (modelData && modelData.error) ? modelData.error : "internal server error"
        return res.send({ error })
    }
    return res.send({ data: modelData.data })
}
async function cartDelete(req, res) {
    let modelData = await cartModel.cartDelete(req.params.id, req.userData).catch((error) => {
        return { error }
    })
    if (!modelData || (modelData && modelData.error)) {
        let error = (modelData && modelData.error) ? modelData.error : "internal server error"
        return res.send({ error })
    }
    return res.send({ data: modelData.data })
}
module.exports = { create, viewAll, update, cartDelete }











// register login
//user table
//task schema
// id, name,desc, assing,status,createby,at
//permission,,
//create task (only one) with permission