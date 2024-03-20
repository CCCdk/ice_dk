import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    //启动后，默认打开浏览器
    open:true,
    // 主机
    host:"127.0.0.1",
    port:3001,//端口
    // 本地代理
    proxy:{
      "/api":{
        target:"http://localhost:3000",
        changeOrigin:true,
        rewrite(path){
          return path.replace(/^\/api/,'')
        }
      }
    }
  }
})

