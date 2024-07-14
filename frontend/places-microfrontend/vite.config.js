import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
    plugins: [
        react(),
        federation({
            name: 'places',
            filename: 'remoteEntry.js',
            exposes: {
                './Places': './src/components/Places',
            },
            shared: ['react', 'react-dom'],
        }),
    ],
    server: {
        port: 5003,
        strictPort: true,
        host: true,
        origin: "http://0.0.0.0:5003",
    },
    build: {
        modulePreload: false,
        target: 'esnext',
        minify: false,
        cssCodeSplit: false,
    },
});