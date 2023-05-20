const mongoose = require("mongoose");

// 注册账号的规则
module.exports = mongoose.model(
    "mongoLogon",
    new mongoose.Schema(
        {
            admin:String,
            password:String,
            time:{
                default:new Date(),
                type:Date
            }
        },
        {
            versionKey:false
        }
    )
)