const mongoMessage = require("../mongoRule/mongoMessage")
const express = require("express")
const router = express.Router()
const fs = require("fs")
const path = require("path");

// 方法
// const Time = require("../methods/time")
// 配置文件的 路径
const configPath = path.join(__dirname, "../config/")
// 处理时间的实例化对象
// const time = new Time()


// 获取所有的标签
router.get("/getAllTable", (req, res) => {
    fs.readFile(configPath + "table.json", "utf-8", (err, data) => {
        const {table} =eval('('+data+')')
        res.send(table)
    })
})

// 获取对应的 留言内容
router.post("/getMessageContent", async (req, res) => {
    let {key} = req.body.data;
    if (key === "全部") res.send(await mongoMessage.find())
    else res.send(await mongoMessage.find({table: key}))
})

// 存储 留言内容
router.post("/saveMessage", async (req, res) => {
    let {key} = req.body.data;
    let result = await mongoMessage.create(key)
    if (result) res.send({code: 1, value: "发布成功"})
})

module.exports = router