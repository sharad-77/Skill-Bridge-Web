import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL || "http://localhost:8000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
        configure: (proxy, ) => {
          proxy.on('error', (err, ) => {
            console.error('Proxy error:', err);
          });
          proxy.on('proxyReq', (proxyReq ) => {
            proxyReq.removeHeader('referer');
            proxyReq.setHeader('X-Forwarded-Proto', 'http');
          });
          proxy.on('proxyRes', (proxyRes) => {
            delete proxyRes.headers['server'];
            delete proxyRes.headers['x-powered-by'];
          });
        },
      },
    },
  },
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
      jsxRuntime: 'automatic',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },

})
