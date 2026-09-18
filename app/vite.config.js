import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed as a GitHub Pages project site at /aangan/, so asset URLs and
// the router basename both need to know about that subpath.
export default defineConfig({
  base: '/aangan/',
  plugins: [react()],
  server: {
    host: true,
  },
  preview: {
    host: true,
  },
})
