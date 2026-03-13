import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  base: '/aura-toast/',
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      exclude: ['src/App.tsx', 'src/main.tsx', 'src/styles/demo.css', 'src/core/ToastStore.test.ts'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AuraToast',
      formats: ['es', 'cjs'],
      fileName: (format) => `aura-toast.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
