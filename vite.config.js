import { defineConfig } from 'vite';
import { cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// Catalog photos and JSON use runtime URLs, so preserve their paths in the build.
const root = fileURLToPath(new URL('.', import.meta.url));
export default defineConfig({
  base: './',
  publicDir: false,
  build: { outDir: 'dist', assetsDir: 'bundled' },
  plugins: [{
    name: 'copy-catalog-assets',
    async closeBundle() {
      for (const directory of ['assets', 'data']) {
        await cp(new URL(directory, import.meta.url), new URL(`dist/${directory}`, import.meta.url), { recursive: true });
      }
      await cp(`${root}.htaccess`, `${root}dist/.htaccess`);
    }
  }]
});

