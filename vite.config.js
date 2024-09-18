import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom', // Para pruebas que interactúan con el DOM
    include: ['src/tests/**/*.test.{js,ts,jsx,tsx}'], // Incluye archivos .test.jsx en la carpeta src/tests/
  },
})