import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import replace from '@rollup/plugin-replace';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    //* CONFIGURACION PARA LEER VARIABLES DE ENTORNO
    replace({
      'process.env.PUBLIC_TOKEN': JSON.stringify(process.env.PUBLIC_TOKEN),
      'process.env.SECRECT_TOKEN': JSON.stringify(process.env.SECRECT_TOKEN),
    }),
    react()
  ],
})
