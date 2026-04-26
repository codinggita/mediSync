import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Forced reload to pick up new dependencies like framer-motion
export default defineConfig({
  plugins: [react()],
})
