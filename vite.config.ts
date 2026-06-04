import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import {
  fileURLToPath
} from 'node:url'

export default defineConfig({
  base: './',
  root: 'src',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  publicDir: 'assets',

  // Electron
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true
  },
  build: {
    outDir: '../dist/renderer',
    emptyOutDir: true
  }
})
