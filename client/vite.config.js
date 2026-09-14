import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiTarget = env.API_PROXY_TARGET || 'http://localhost:3000'

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      proxy: {
        "/api": apiTarget,
      },
    },
    preview: {
      proxy: {
        "/api": apiTarget,
      },
    },
  }
})
