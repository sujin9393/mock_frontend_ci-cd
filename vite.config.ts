import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // ← 이거 추가!!
  server: {
    proxy: {
      "/api": {
        target: "http://34.22.102.29:8080", // Spring Boot 서버 주소
        changeOrigin: true,
      },
    },
  },
});
