import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cblack: '#1C1C1E',
        corange: '#F25D23',
        'corange-lighter': '#FF630B',
        'corange-light': '#FF9447',
        cgray: '#9D9C9C',
        'cgray-lighter': '#F2F2F1',
        'cgray-darker': '#D8D3CC',
        cpurple: '#9747FF',
      }
    },
  },
  plugins: [],
}
export default config
