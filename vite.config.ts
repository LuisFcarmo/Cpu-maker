import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Isso permite que o servidor use o IP local
    port: 5173  // Porta padrão do Vite (você pode ajustar se necessário)
  }
})
