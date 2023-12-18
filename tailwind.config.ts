import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontWeight: '700',
              fontSize: '28pt',
              marginBottom: '0.5em',
              marginTop: '0.5em',
            },
            h2: {
              marginBottom: '.75em',
              marginTop: '.75em',
            },
            h3: {
              marginTop: '1em',
            },
            a: {
              color: 'rgb(59, 130, 246)',
            }
          }
        }
      },
    },
  },
  plugins: [require(`@tailwindcss/typography`)],
}
export default config
