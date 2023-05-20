function popUp(text: string, type: string) {
    console.log(type);

    // 判断当前页面是否存在 id为 pop-up 的dom元素
    // 存在: 删除,重新创建元素 添加到页面 <设表先关概念>
    // 不存在: 创建元素 添加到页面
    const idPopUp = document.getElementById("pop-up")
    if (idPopUp) {
        console.log("先不做处理");
    } else {
        /**
         * 1.获取App的DOM元素
         * 2.创建一个div元素
         * 3.设置样式
         * 4.添加内容
         * 5.根据传入的参数设置弹窗的颜色
         * 6.追加到页面
         * 7.3秒后消失
         */
        const appDOM = document.getElementById("app")
        const popUpDOM = document.createElement("div")
        popUpDOM.setAttribute("id", "pop-up")
        popUpDOM.style.boxSizing = "border-box"
        popUpDOM.style.display = "flex"
        popUpDOM.style.position = "fixed"
        popUpDOM.style.top = "40px"
        popUpDOM.style.left = "45%"
        popUpDOM.style.alignItems = "center"
        popUpDOM.style.paddingLeft = "10px"
        popUpDOM.style.width = "200px"
        popUpDOM.style.height = "40px"
        popUpDOM.style.borderRadius = "5px"
        popUpDOM.style.transition = "all 0.5s"
        switch (type) {
            case "fail":
                popUpDOM.style.border = "1px solid #FFD4D9"
                popUpDOM.style.color = "#FF1744"
                popUpDOM.style.backgroundColor = "#FFE9EC"
                break;
            case "success":
                popUpDOM.style.border = "1px solid #C6FFBB"
                popUpDOM.style.color = "#00FF00"
                popUpDOM.style.backgroundColor = "#E8FFE4"
                break;
            case "warn":
                popUpDOM.style.border = "1px solid #FFECB6"
                popUpDOM.style.color = "#FF9900"
                popUpDOM.style.backgroundColor = "#FFF7DA"
                break;
        }
        popUpDOM.innerText = text
        appDOM?.appendChild(popUpDOM)
        setTimeout(() => {
            appDOM?.removeChild(popUpDOM)
            console.log("移除成功");
        }, 2000)
    }
}


export default popUp