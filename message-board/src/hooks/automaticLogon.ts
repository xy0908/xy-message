import axios from "axios";
import popUp from "./popUp";
import { useLogonStore } from "../store/logon"
const url = "/api";

async function automaticLogon() {
    // 使用 登录仓库
    const logonStore = useLogonStore()

    const { data } = await axios.post(url + "/logon/automaticLogon", {
        data: {
            token: window.localStorage.getItem("TOKENXIAOYANG")
        }
    })

    if (data.code === 1) {
        logonStore.logonState = true
        popUp("自动登录成功", "success")
    } else popUp("账号过期,请重新登录", "fail")
}


export default automaticLogon