let jwt = require("jsonwebtoken")
let bcrypt=require('bcrypt')
// let ptext = { id: 2 }
// let key2 = '678(*&'
function encrypt(text, key) {
    return new Promise((res, rej) => {
        jwt.sign(text, key, (error, token) => {
            if (error) {
                return rej(error);
            }
            return res(token);
        });
    });
}
function decrypt(text, key) {
    return new Promise((res, rej) => {
        jwt.verify(text, key, (error, token) => {
            if (error) {
                return rej(error)
            }
            return res(token)
        })
    })
}
async function hash(ptext,salt=10){
    let encrypt=await bcrypt.hash(ptext,salt).catch((error)=>{
        console.log(error)
    });
    if(!encrypt ||(encrypt && encrypt.error)){
        return {error:encrypt.error}
    }
    return {data:encrypt}
}
async function compare(ptext,et){
    let check=await bcrypt.compare(ptext,et).catch((error)=>{
        return{error}
    });
    if(!check || (check && check.error)){
        return{error:check && check.error ? check.error:true}
    }
    return{data:true}
}
// encrypt(ptext, key2).then((data) => { console.log(data, "data")
// decrypt(data,key2).then((d) => { console.log(d) })
//     .catch((error) => { console.log(error) })
//  })
//     .catch((error) => { console.log(error) })
module.exports={encrypt,decrypt,hash,compare}