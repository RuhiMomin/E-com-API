const { query } = require('express')
let productModel = require('../Model/product')
async function createProduct(req, res) {
    let modelData = await productModel.create(req.body).catch((err) => {
        return { error: err }
    })

    if (!modelData || (modelData && modelData.error)) {
        let error = (modelData && modelData.error) ? modelData.error : 'internal server error'
        return res.send({ error })
    }
    return res.send({ data: modelData.data })
}
async function viewAll(req, res) {
    let modelData = await productModel.viewAll(req.query, req.userData.permiss).catch((error) => {
        return { error }
    })
    console.log(modelData, 'weeeeeee');
    if (!modelData || (modelData && modelData.error)) {
        let error = (modelData && modelData.error) ? modelData.error : "internal server error"
        return res.send({ error })
    }
    return res.send({
        data: modelData.data, page: modelData.page, limit: modelData.limit, total: modelData.total,
        totalPages: modelData.totalpages, count: modelData.count
    })
}

async function viewDetails(req, res) {
    let modelData = await productModel.viewDetails(req.params.id).catch((error) => {
        return { error }
    })
    if (!modelData || (modelData && modelData.error)) {
        let error = (modelData && modelData.error) ? modelData.error : "internal server error"
        return res.send({ error })
    }
    return res.send({ data: modelData.data })
}

async function update(req, res) {
    let modelData = await productModel.update(req.params.id, req.body).catch((error) => {
        return { error }
    })
    console.log(modelData, "weeeeee");
    if (!modelData || (modelData && modelData.error)) {
        let error = (modelData && modelData.error) ? modelData.error : "internal server error"
        return res.send({ error })
    }
    return res.send({ data: "update successfull" })
}

async function pDelete(req, res) {
    let modelData = await productModel.pDelete(req.params.id, true).catch((error) => {
        return { error }
    })
    if (!modelData || (modelData && modelData.error)) {
        let error = (modelData && modelData.error) ? modelData.error : "internal server error"
        return res.send({ error })
    }
    return res.send({ data: "product deleted" })
}
async function restore(req, res) {
    let modelData = await productModel.pDelete(req.params.id, false).catch((error) => {
        return { error }
    })
    if (!modelData || (modelData && modelData.error)) {
        let error = (modelData && modelData.error) ? modelData.error : "internal server error"
        return res.send({ error })
    }
    return res.send({ data: modelData.data, msg: "restore successfully" })
}

module.exports = { createProduct, viewAll, viewDetails, update, pDelete, restore }