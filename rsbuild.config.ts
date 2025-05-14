import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: process.env.PORT ? +process.env.PORT : 3000,
    proxy: {
      '/app-deploy/api': 'http://localhost:2301',
    },
  },
  output: {
    assetPrefix: process.env.PUBLIC_BASE_PATH,
    distPath: {
      js: '',
      css: '',
      html: '',
    },
    filename: {
      js: '[name].js',
      css: '[name].css',
    },
    legalComments: 'none',
  },
  source: {
    entry: {
      index: 'src/app/index.tsx',
    },
    alias: {
      '@': './src',
      '@routing': './src/app/router/config.ts',
    },
  },
  performance: {
    chunkSplit: {
      strategy: 'all-in-one',
    },
  },
  html: {
    template: './src/app/index.html',
  },
});
