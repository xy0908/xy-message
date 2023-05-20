const mongoose = require("mongoose")

// 表规则
module.exports = mongoose.model(
    "mongoMessage",
    new mongoose.Schema(
        {
            table: String,
            content: String,
            star: Number,
            comment: Number,
            author: String,
            background: String,
            time: {
                default: new Date(),
                type: Date
            }
        },
        {
            versionKey:false
        }
    )
)