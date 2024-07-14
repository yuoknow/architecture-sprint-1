import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
    plugins: [
        react(),
        federation({
            name: 'profile',
            filename: 'remoteEntry.js',
            exposes: {
                './Profile': './src/components/Profile',
            },
            shared: ['react', 'react-dom'],
        }),
    ],
    server: {
        port: 5002,
        strictPort: true,
        host: true,
        origin: "http://0.0.0.0:5002",
    },
    build: {
        modulePreload: false,
        target: 'esnext',
        minify: false,
        cssCodeSplit: false,
    },
});