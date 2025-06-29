import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Performance optimizations
  build: {
    // Enable code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react'],
          firebase: ['firebase/app', 'firebase/database'],
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable source maps for production debugging
    sourcemap: true,
    // Minify for production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Fix MIME type issues for deployment
    assetsDir: 'assets',
    outDir: 'dist',
  },
  
  // Development server optimizations
  server: {
    // Enable HTTP/2
    https: false,
    // Optimize HMR
    hmr: {
      overlay: true,
    },
  },
  
  // Dependency optimization
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react', 'firebase/app', 'firebase/database'],
    exclude: [],
  },
  
  // CSS optimization
  css: {
    devSourcemap: true,
  },
  
  // Asset optimization
  assetsInclude: ['**/*.woff2', '**/*.woff'],
  
  // Fix deployment issues
  base: './',
});