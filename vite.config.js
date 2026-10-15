import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { tryOnApiMiddleware } from './server/apiMiddleware.js'

function tryOnServerPlugin() {
  return {
    name: 'thugil-tryon-api',
    configureServer(server) {
      server.middlewares.use(tryOnApiMiddleware())
    },
    configurePreviewServer(server) {
      server.middlewares.use(tryOnApiMiddleware())
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tryOnServerPlugin()],
})
