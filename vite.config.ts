import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: 'localhost', //target host
    port: 7777,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7002',
        changeOrigin: true,
      },
      // '/zf': {
      //   target: 'http://upload-z2.qiniup.com',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/zf/, '')
      // }
    }
 }
})
