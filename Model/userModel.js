//validation
let { User } = require('../Schema/userSchema');
let joi = require("joi");

async function create(params) {
    let valid = await check(params).catch((err) => {
        return { error: err }
    });
    if (!valid || (valid && valid.error)) {
        console.log("error 1")
        return { error: valid.error }
    }
    console.log("model1");
    let userData = {
        name: params.username,
        email: params.email,
        contact: params.contact,
        password: params.password
    }

    let data = await User.create(userData).catch((err) => {
        return { error: err }
    });
    if (!data || (data && data.error)) {
        console.log("error 2")
        return { error: 'internal server error' }
    }
    return { data: data }
}

async function check(data) {
    let schema = joi.object({
        username: joi.string().min(10).max(25).required(),
        email: joi.string().min(8).max(15).required(),
        contact: joi.string().min(10).max(12).required(),
        password: joi.string().min(8).max(15).required()
    })
    let valid = await schema.validateAsync(data).catch((err) => {
        return { error: err }
    });
    if (!valid || (valid && valid.error)) {
        let msg = [];
        for (let i of valid.error.details) {
            msg.push(i.message);
        }
        return { error: msg }
    }
    return { data: valid }
}
module.exports = { create }






