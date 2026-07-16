import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      // Allows Google Sign-In popup to postMessage back to the app
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    },
  },
})
