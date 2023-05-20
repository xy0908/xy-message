const mongoLogon = require("../mongoRule/mongoLogon")
const {createToken,verToken} = require("../token/token")
const express = require("express")
const router = express.Router()

// 注册
router.post("/register",async (req,res)=>{
    // 获取前端通过验证传递的账号和密码
    const {admin,password} = req.body.data
    // 查找数据库是否存在账号
    // 存在返回注册失败
    // 不存在 把账号和密码存入数据库 返回注册成功
    const result = await mongoLogon.findOne({admin})
    if (!result){
        await mongoLogon.create({admin, password})
        res.send({code:1,value:"注册成功"})
    }else res.send({code:0,value:"账号存在"})
})

// 登录
router.post("/logon",async (req,res)=>{
    const {admin,password} = req.body.data
    // 1.先判断账号是否存在
    const result = await mongoLogon.findOne({admin})
    if (result){
        // 2.然后判断密码是否正确
        if (result.password === password)res.send({code:1,value:"登录成功",token:createToken({token:result})})
        else res.send({code:0,value:"密码错误"})
    }else res.send({code:0,value:"账号不存在"})
})

// 自动登录
router.post("/automaticLogon",async (req,res)=>{
    const {token} = req.body.data
    if (token){
        const bol = await verToken(token.split(" ")[1]);
        // 判断账号是否存在
        const result = await mongoLogon.findOne({admin:bol.token.admin})
        if (result){
            if (result.password === bol.token.password) res.send({code:1,value:"登录成功"})
            else res.send({code:0,value:"错误"})
        }
    }
})

module.exports = router