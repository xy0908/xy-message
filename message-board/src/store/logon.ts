import { acceptHMRUpdate, defineStore } from "pinia"
import axios from "axios";
import popUp from "../hooks/popUp";
// 匹配中文
const adminREG = /[\u4e00-\u9fa5]/;
const passwordREG = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
const url = "/api";

class DetectionAdmin {
    admin: Ref<string>
    password: Ref<string>
    adminDOM: HTMLInputElement
    passwordDOM: HTMLInputElement

    constructor(adminDOM: HTMLInputElement, passwordDOM: HTMLInputElement, admin: Ref<string>, password: Ref<string>) {
        this.admin = admin
        this.password = password
        this.adminDOM = adminDOM
        this.passwordDOM = passwordDOM
    }

    // 判断是否为空 账号和密码
    isEmpty() {
        if (this.admin.value === '') {
            this.adminDOM.style.borderColor = "red"
            this.adminDOM.setAttribute('placeholder', "账号不能为空")
            this.adminDOM.classList.add("adminPlaceholder")
            setTimeout(() => {
                this.adminDOM.style.borderColor = "#dcdfe6"
                this.adminDOM.setAttribute('placeholder', "请输入汉字作为账号名称")
                this.adminDOM.classList.remove("adminPlaceholder")
            }, 1000)

        } else if (this.password.value === '') {
            this.passwordDOM.style.borderColor = "red"
            this.passwordDOM.setAttribute('placeholder', "密码不能为空")
            this.passwordDOM.classList.add("passwordPlaceholder")
            setTimeout(() => {
                this.passwordDOM.style.borderColor = "#dcdfe6"
                this.passwordDOM.setAttribute('placeholder', "请输入英文字母作为账号密码")
                this.passwordDOM.classList.remove("passwordPlaceholder")
            }, 1000)
        } else {
            this.isByRules()
        }
    }

    // 判断是否 通过正则
    isByRules() {
        if (adminREG.test(this.admin.value)) {
            if (passwordREG.test(this.password.value)) {
                this.registerAdmin()
            } else {
                this.password.value = ''
                this.passwordDOM.style.borderColor = "red"
                this.passwordDOM.setAttribute('placeholder', "请输入英文为密码嗷！！！")
                this.passwordDOM.classList.add("adminPlaceholder")

                setTimeout(() => {
                    this.passwordDOM.style.borderColor = "#dcdfe6"
                    this.passwordDOM.setAttribute('placeholder', "请输入英文字母作为账号密码")
                    this.passwordDOM.classList.remove("adminPlaceholder")
                }, 1000)
            }
        } else {
            this.admin.value = ''
            this.adminDOM.style.borderColor = "red"
            this.adminDOM.setAttribute('placeholder', "请输入汉字作为密码啦！！！！")
            this.adminDOM.classList.add("adminPlaceholder")
            setTimeout(() => {
                this.adminDOM.style.borderColor = "#dcdfe6"
                this.adminDOM.setAttribute('placeholder', "请输入汉字作为账号名称")
                this.adminDOM.classList.remove("adminPlaceholder")
            }, 1000)
        }
    }

    // 发送请求 注册账号
    async registerAdmin() {
        // code === 1 注册成功
        // code === 0 注册失败
        let { data } = await axios.post(url + "/logon/register", {
            data: {
                admin: this.admin.value,
                password: this.password.value
            }
        })
        if (data.code === 1) popUp("注册成功", "success")
        else popUp("账号存在", "warn")
    }
}

export const useLogonStore = defineStore("logon", () => {
    // 账号
    const admin = ref("");
    // 密码
    const password = ref("");
    // 登录的状态
    const logonState = ref(false);
    // 控制器 控制登录注册组件【盒子】的显示和隐藏
    const logonWarpController = ref(false);
    // 显示登录或者注册组件的开关
    const switchLogonText = ref("登录");

    // 修改 登录或者注册组件的开关
    const changeSwitchLogonText = () => {
        if (switchLogonText.value === '登录') {
            switchLogonText.value = "注册";
        } else {
            admin.value = '';
            password.value = '';
            switchLogonText.value = "登录";
        }
    }
    // 右侧显示字段
    const rightText = () => {
        if (switchLogonText.value === '登录') return '注册'
        else return '登录'
    }
    // 修改登录注册【盒子】 控制器
    const changeLogonWrapController = (): void => {
        logonWarpController.value = !logonWarpController.value;
    };

    // 注册按钮
    const register = (adminDom: HTMLInputElement, passwordDom: HTMLInputElement) => {
        const detectionAdmin = new DetectionAdmin(adminDom, passwordDom, admin, password)
        detectionAdmin.isEmpty()
    }

    // 登录
    const logon = async () => {
        const { data } = await axios.post(url + "/logon/logon", {
            data: {
                admin: admin.value,
                password: password.value
            }
        })
        // code === 1 登录成功
        // code === 0 登录失败
        if (data.code === 1) {
            popUp("登录成功", "success")
            // 设置 浏览器本地缓存 local storage 
            window.localStorage.setItem("TOKENXIAOYANG", data.token)
            // 关闭登录弹窗
            changeLogonWrapController()
            // 修改登录的状态
            logonState.value = true
        } else {
            popUp("账号或者密码错误", "fail")
        }
    }

    return {
        admin,
        password,
        logonState,
        switchLogonText,
        logonWarpController,
        logon,
        register,
        rightText,
        changeSwitchLogonText,
        changeLogonWrapController
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useLogonStore, import.meta.hot))
}