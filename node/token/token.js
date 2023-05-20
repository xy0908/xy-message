const jwt = require("jsonwebtoken");
const key = 'xiaoyang';

// 加密
exports.createToken = (value)=>{
    return 'Bearer ' + jwt.sign(value,key,{expiresIn: "3days"});
}

// 解密
exports.verToken = (token)=>{
    return new Promise((res,rej)=>{
        jwt.verify(token,key,(err,data)=>{
            if (!data){
                res(false)
            }else {
                res(data)
            }
        })
    })
}