let joi = require('joi')
let { User } = require('../Schema/userSchema');
let secure = require('../Helpers/security')

async function check(data) {     //userdata validation
    let schema = joi.object({
        username: joi.string().required(),
        email: joi.string().required(),
        contact: joi.string().required(),
        password: joi.string().min(8).max(15).required()
    })
    let valid = await schema.validateAsync(data).catch((err) => {       //error handling
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
async function register(params) {
    let valid = await check(params).catch((err) => {       ///error handling
        return { error: err }
    });
    if (!valid || (valid && valid.error)) {            //double check 
        return { error: valid.error };
    }
    let finduser = await User.findOne({ where: { email: params.email } }).catch((err) => {
        return { error: err } //check if email exist in db
    })
    if (finduser || (finduser && finduser.error)) {       //find need to b empty always (for no same name)
        return { error: "already exist" }
    }
    let msg_dig = await secure.hash(params.password).catch((err) => {
        return { error: err }            //hash the password
    })
    if (!msg_dig || (msg_dig && msg_dig.error)) {
        return { error: error0 }
    }
    let userData = {             //format user data
        name: params.username,
        email: params.email,
        contact: params.contact,
        password: msg_dig.data                           //password in string
    }
    let data = await User.create(userData).catch((err) => {               //insert into db
        return { error: err }               //return all default value
    })
    if (!data || (data && data.error)) {
        return { error: "ERROR" }                  //db error
    }
    return { data: data }
}

async function checkLogin(data) {
    let schema = joi.object({
        email: joi.string().required(),
        password: joi.string().required()
    })
    let valid = await schema.validateAsync(data).catch((err) => {
        return { error: err }
    })
    if (!valid || (valid && valid.error)) {
        let jungle = []
        for (let i of valid.error.details) {
            jungle.push(i.message);
        }
        return { error: jungle }
    }
    return { data: valid }
}
async function Login(admin) {
    let verify = await checkLogin(admin).catch((err) => {  //user validation
        return { error: err }
    })
    if (!verify || (verify && verify.error)) {    //error handling
        return { error: verify.error }
    }
    let find = await User.findOne({ where: { email: admin.email } }).catch((err) => {
        return { error: err }  //check email exist
    })
    if (!find || (find && find.error)) {
        return { error: 'invalid email' }
    }
    let pass = await secure.compare(admin.password, find.password).catch((err) => {
        return { error: err }      //compare password to db password
    })
    if (!pass || (pass && pass.error)) {
        return { error: "wrong password" }
    }
    let token = await secure.encrypt({ id: find.id }, "#1234").catch((err) => {
        return { error: err }     //generate token
    })
    if (!token || (token && token.error)) {
        return { error: token.error }
    }
    let upData = await User.update({ token: token }, { where: { id: find.id } }).catch((err) => {
        return { error: err }      //update token.....save what n where 
    })
    if (!upData || (upData && upData.error) || (upData && upData[0] <= 0)) {
        return { error: "internal server error" }
    }
    return { data: "login successfull", token: token }
}
module.exports = { register, Login } 