const { defineConfig } = require('vite')
const vue = require('@vitejs/plugin-vue')

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue()],
  // If you need runtime build alias (rare for Vue 3), uncomment below:
  // resolve: { alias: { 'vue$': 'vue/dist/vue.esm-bundler.js' } },
})
