import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:8000",
    },
  },
  logLevel: "error",
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
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },

})
