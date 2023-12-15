let authModel = require("../Model/authModel")
async function userRegister(req, res) {
    let modelData1 = await authModel.register(req.body).catch((err) => {
        return { error: err }              //check errror in req
    })
    if (!modelData1 || (modelData1 && modelData1.error)) {
        let error = (modelData1 && modelData1.error) ? modelData1.error : 'internal server error'
        return res.send({ error })
    }
    return res.send({ data: modelData1.data })
}

async function userLogin(req, res) {
    let modelData2 = await authModel.Login(req.body).catch((err) => {
        return { error: err }
    })
    console.log(modelData2)
    if (!modelData2 || (modelData2 && modelData2.error)) {
        let error = (modelData2 && modelData2.error) ? modelData2.error : "internal server error"
        return res.send({ error })
    }
    return res.header({ token: modelData2.token }).send({ data:"Login Success" })
}
module.exports = { userRegister, userLogin }