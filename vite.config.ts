import {babel} from '@rollup/plugin-babel';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'node:path'

// import {mockServerConfig} from './mock-server.config';
// import { startMockServer } from 'mock-config-server';

// startMockServer(mockServerConfig)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    babel({extensions: ['.ts', '.tsx'], babelHelpers: 'bundled', skipPreflightCheck: true}),
    react({fastRefresh: false})
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:31299',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: [
      {
        find: '~',
        replacement: path.resolve('src'),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "shared/styles/_variables.sass" as *;`,
      },
    },
  },
})
