import { acceptHMRUpdate, defineStore } from "pinia"

export const useReleaseMessage = defineStore("releaseMessage", () => {
    return {}
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useReleaseMessage, import.meta.hot))
}