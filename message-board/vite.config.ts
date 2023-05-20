import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Pages from "vite-plugin-pages"
import Layouts from "vite-plugin-vue-layouts"

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pages({
      extensions: ['vue', 'md'],
    }),
    Layouts(),
    AutoImport({
      imports: ["vue", "vue-router", '@vueuse/head', "pinia"],
      dts: 'src/auto-import.d.ts',
      dirs: ["src/store/*"],
    }),
    Components({
      extensions: ['vue'],
      dts: 'src/components.d.ts',
    }),
  ],
  server: {
    host: "0.0.0.0",
    // 配置跨域请求
    proxy: {
      '/api': {
        target: 'http://localhost:1212',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  }
})