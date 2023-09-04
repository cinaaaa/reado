import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import zipPack from 'vite-plugin-zip-pack';
// @ts-ignore
import manifest from './src/manifest';

export default defineConfig(() => {
  return {
    build: {
      emptyOutDir: true,
      outDir: 'build',
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/chunk-[hash].js',
        },
      },
    },

    plugins: [
      crx({ manifest }),
      zipPack({
        outDir: `package`,
        inDir: 'build',
        // @ts-ignore
        outFileName: `${manifest.short_name ?? manifest.name.replaceAll(' ', '-')}-extension-v${
          // @ts-ignore
          manifest.version
        }.zip`,
      }),
    ],
  };
});
