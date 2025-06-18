import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('mapbox-gl')) return 'mapbox';
            return 'vendor';
          }
        },
      },
      chunkSizeWarningLimit: 1000, // Optional: Increase limit to suppress warning
    },
  },
});
