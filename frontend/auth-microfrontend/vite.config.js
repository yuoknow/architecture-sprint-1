import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
    plugins: [
        react(),
        federation({
            name: 'auth',
            filename: 'remoteEntry.js',
            exposes: {
                './Auth': './src/components/Auth',
                './Login': './src/components/Login',
                './Register': './src/components/Register',
            },
            shared: ['react', 'react-dom', 'react-router-dom'],
        }),
    ],
    server: {
        port: 5001,
    },
    build: {
        modulePreload: false,
        target: 'esnext',
        minify: false,
        cssCodeSplit: false,
    },
});