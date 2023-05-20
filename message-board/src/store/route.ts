import { acceptHMRUpdate, defineStore } from "pinia"

export const useRouterStore = defineStore("router", () => {
    // 路由数据
    const nav = reactive([
        {
            path: "/",
            text: "留言板",
            isActivation: true,
        },
        {
            path: "/photoWall",
            text: "照片墙",
            isActivation: false,
        },
    ]);

    // 判断当前路由是否激活
    const isActivation = (data: boolean) => {
        if (data) return "activation"
    }

    return { nav, isActivation }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useRouterStore, import.meta.hot))
}