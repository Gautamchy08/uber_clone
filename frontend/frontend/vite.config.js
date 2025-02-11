import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  content: ['./index.html', './src/**/*.{jsx,tsx,js,ts}'],
  plugins: [react(), tailwindcss()]
})
