import {defineConfig} from 'vite';
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);
const motionCanvas = require('@motion-canvas/vite-plugin').default;

export default defineConfig({
  plugins: [motionCanvas()],
});
