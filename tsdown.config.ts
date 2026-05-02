import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  platform: 'neutral',
  target: 'es2020',
  fixedExtension: true,
  sourcemap: false,
  deps: {
    neverBundle: ['react', 'react-dom'],
  },
  outDir: 'dist',
})
