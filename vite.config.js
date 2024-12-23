import {defineConfig} from "vite";
 import react from '@vitejs/plugin-react'
export default defineConfig({
    base:"./",
    build:{
        minify:"terser",
    },
    plugins:[react()]
})
