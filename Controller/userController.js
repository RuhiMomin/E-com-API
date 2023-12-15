let userModel = require('../Model/userModel');
async function createUser(req, res) {
    let ModelData = await userModel.create(req.body)
        .catch((err) => { return { error: err } });
    if (!ModelData || (ModelData && ModelData.error)) {
        let error = (ModelData && ModelData.error) ?
            ModelData.error : 'internal server';
        return res.send({ error })
    }
    return res.send({ data: ModelData.data })
}
module.exports = { createUser }


//manage error
//manage req res (send)
