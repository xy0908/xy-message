import { ViteSSG } from "vite-ssg"
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { createPinia } from "pinia"
import App from './App.vue'

const routes = setupLayouts(generatedRoutes)

export const createApp = ViteSSG(
    App,
    { routes },
    ({ app, router, initialState }) => {
        const pinia = createPinia();
        app.use(pinia)
    }
)