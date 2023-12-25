import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    manifest: true,
    rollupOptions: {
      input: './src/main.tsx',
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:8000", // the address that u serve in the backend 
    },
  },
})
