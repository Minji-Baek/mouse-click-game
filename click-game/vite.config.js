import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  // root: 'src',
  base: '/mouse-click-game/',
  build: {
    chunkSizeWarningLimit: 1600,
    // outDir: '../dist',
    // emptyOutDir: true,
    },
})
