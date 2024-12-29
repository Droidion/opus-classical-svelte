import antfu from '@antfu/eslint-config'

export default antfu({
  svelte: true,
  formatters: {
    css: true,
    html: true,
  },
  typescript: true,
  jsonc: false,
  yaml: false,
})
