import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#1F4E79',
          blue: '#2E75B6',
          orange: '#ED7D31',
          green: '#375623',
          yellow: '#FFC000',
        }
      }
    },
  },
  plugins: [],
}
export default config