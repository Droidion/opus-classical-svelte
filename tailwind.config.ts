import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{html,svelte}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    colors: {
      lazer: '#CAA277',
      codgray: '#1a1a1a',
      mineshaft: '#373737',
      cinnamon: '#7E5503',
      white: '#FFFFFF',
      black: '#000000',
    },
  },
  plugins: [],
}

export default config
