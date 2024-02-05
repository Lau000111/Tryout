import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { defineConfig as defineVitestConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  // test: {
  //   globals: true,
  //   environment: 'jsdom',
  //   setupFiles: './src/setupTests.ts',
  // }
  server: {
    host: true,
    port: parseInt(process.env.PORT ?? "5173")
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'], // Pfad zu deiner Setup-Datei
  },
})
