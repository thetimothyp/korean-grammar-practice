import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'purple': '0 6px 0 0 rgba(168, 85, 247, 1)',
        'yellow': '0 6px 0 0 rgba(253, 224, 71, 1)',
        'green': '0 6px 0 0 rgba(34, 197, 94, 1)',
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontWeight: '700',
              fontSize: '2em',
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
        },
        lg: {
          css: {
            h1: {
              fontWeight: '700',
              fontSize: '2em',
              marginBottom: '0.5em',
              marginTop: '0.5em',
            },
            h2: {
              marginBottom: '.5em',
              marginTop: '1em',
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
  plugins: [require(`@tailwindcss/typography`), require('flowbite/plugin')],
}
export default config
