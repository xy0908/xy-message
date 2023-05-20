const mongoose = require("mongoose")
const express = require("express");
const app = express();

app.use(express.static("./public"))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// table 路由
app.use("/table", require("./router/table"))
// 登录 注册 路由
app.use("/logon",require("./router/logon"))


// 连接数据库
mongoose.connect("mongodb://localhost:27017/message")
    .then(() => {
        console.log("数据库连接成功");
    }).catch(() => {
    console.log("连接失败");
})

app.listen("1212", () => {
    console.log("1212 serve ok")
})