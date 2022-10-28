
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    include: ['**/*.unit.test.js'],
    exclude: [], // ['**/node_modules/**'],
    watchExclude: [], // ['**/node_modules/**'],
  },
})
