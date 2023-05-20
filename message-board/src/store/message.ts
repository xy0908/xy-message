import { acceptHMRUpdate, defineStore } from "pinia"
import axios from "axios";
import popUp from "../hooks/popUp";
const url = "/api";

export const useMessageStore = defineStore("message", () => {
    // 发布留言模板
    let messageTemplate = reactive({
        table: "星穹铁道",
        content: "",
        star: 0,
        comment: 0,
        author: "",
        background: "#FFD6C8",
    });
    // 控制器 控制发布留言弹窗的显示和隐藏
    const releaseMessagecontroller = ref(false);
    // 留言板 可选择的背景颜色数据
    const messageBackgroundData = ref([
        {
            bg: "#FFD6C8",
            state: "true",
        },
        {
            bg: "#BAF1FF",
            state: "false",
        },
        {
            bg: "#C6FCFF",
            state: "false",
        },
        {
            bg: "#F4E1FF",
            state: "false",
        },
        {
            bg: "#D6FFC4",
            state: "false",
        },
    ]);
    // table标签数据
    const table = ref([
        {
            text: "星穹铁道",
            isActivation: "true",
        },
        {
            text: "原神",
            isActivation: "false",
        },
        {
            text: "绝区零",
            isActivation: "false",
        },
        {
            text: "卡拉比丘",
            isActivation: "false",
        },
        {
            text: "来自星尘",
            isActivation: "false",
        },
        {
            text: "小羊的推荐",
            isActivation: "false",
        },
    ]);

    // 改变背景板颜色
    const changeMessageBackground = (key: string): void => {
        // key 选中的值
        messageBackgroundData.value.forEach((item) => {
            item.state = "false";
            if (item.bg === key) {
                item.state = "true";
                // messageTemplate.background = key;
            }
        });
    };

    // 改变标签
    const changeTable = (key: string): void => {
        table.value.forEach((item) => {
            item.isActivation = "false";
            if (item.text === key) {
                item.isActivation = "true";
                // messageTemplate.table = key;
            }
        });
    };

    // 修改发布留言控制器
    const changeReleaseMessagecontroller = (): void => {
        releaseMessagecontroller.value = !releaseMessagecontroller.value;
    };

    // 发布留言
    const release = async (textareaContent: string, authorContent: string) => {
        if (textareaContent === "") popUp("请填写内容", "warn")
        else {
            messageTemplate.content = textareaContent.trim();
            messageTemplate.author = authorContent.trim();
            const { data } = await axios.post(url + "/table/saveMessage", {
                data: {
                    key: messageTemplate,
                },
            });
            if (data.code === 1) {
                popUp("留言成功", "success")
                location.reload();
            }
        }
    };

    return {
        releaseMessagecontroller,
        table,
        messageBackgroundData,
        changeReleaseMessagecontroller,
        changeMessageBackground,
        changeTable,
        release
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMessageStore, import.meta.hot))
}