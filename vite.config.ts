import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const isLibrary = mode === 'library';

  return {
    base: '/aura-toast/',
    plugins: [
      react(),
      isLibrary && dts({
        insertTypesEntry: true,
        exclude: ['src/App.tsx', 'src/main.tsx', 'src/styles/demo.css', 'src/core/ToastStore.test.ts'],
      }),
    ],
    build: isLibrary 
      ? {
          lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'AuraToast',
            formats: ['es', 'cjs'],
            fileName: (format) => `aura-toast.${format}.js`,
          },
          rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
            output: {
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
                'react/jsx-runtime': 'jsxRuntime',
                'react/jsx-dev-runtime': 'jsxDevRuntime',
              },
            },
          },
        }
      : {
          outDir: 'dist-demo',
        },
  };
});
