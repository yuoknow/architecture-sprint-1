import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(),
        federation({
            name: 'app',
            filename: 'remoteEntry.js',
            remotes: {
                auth: 'http://localhost:5001/assets/remoteEntry.js',
                profile: 'http://localhost:5002/assets/remoteEntry.js',
                places: 'http://localhost:5003/assets/remoteEntry.js',
            },
            shared: ['react','react-dom', 'react-router-dom']
        })
    ],
    server: {
        port: 5000,
        strictPort: true,
        host: true,
    },
    build: {
        modulePreload: false,
        target: 'esnext',
        minify: false,
        cssCodeSplit: false
    }
})

