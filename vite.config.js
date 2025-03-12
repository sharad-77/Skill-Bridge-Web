import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

export default defineConfig({
  plugins: [
    tailwindcss({
      theme: {
        extend: {
          backgroundImage: {
            'dot-pattern': "radial-gradient(currentColor 1px, transparent 1px)",
          },
          backgroundSize: {
            'dots': '16px 16px',
          },
        },
      },
    }),
  ],
  resolve: {
    alias:{
      '@':path.resolve(__dirname, 'src'),
    }
  }
})

