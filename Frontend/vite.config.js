import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    tailwindcss({
      theme: {
        extend: {
          fontFamily: {
            custom: [
              'ui-sans-serif',
              'system-ui',
              'sans-serif',
              '"Apple Color Emoji"',
              '"Segoe UI Emoji"',
              '"Segoe UI Symbol"',
              '"Noto Color Emoji"',
            ],
          },
          backgroundImage: {
            'dot-pattern': "radial-gradient(currentColor 1px, transparent 1px)",
          },
          backgroundSize: {
            'dots': '16px 16px',
          },
        },
      },
    }),
    react({
      jsxRuntime: 'automatic', // <-- important
    }),
  ],
  resolve: {
    alias:{
      '@': path.resolve(__dirname, 'src'),
    }
  }
})
