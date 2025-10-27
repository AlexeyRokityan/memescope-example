import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const scaled = (value: number, unit: 'px' | 'rem' = 'px') =>
  `calc(var(--responsive-scale) * ${value}${unit})`;

const config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './widgets/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}',
    './entities/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-family)', 'Outfit', 'sans-serif'],
      },
      fontSize: {
        xs: scaled(8),
        sm: scaled(10),
        base: scaled(12),
        lg: scaled(14),
        xl: scaled(16),
        large: scaled(20),
      },
      colors: {
        border: 'rgb(var(--color-third-text))',
        input: 'rgb(var(--color-third-text))',
        ring: 'rgb(var(--color-light-green))',
        background: 'rgb(var(--color-main-bg))',
        foreground: 'rgb(var(--color-main-text))',
        card: {
          DEFAULT: 'rgb(var(--color-secondary-bg))',
          foreground: 'rgb(var(--color-main-text))',
        },
        popover: {
          DEFAULT: 'rgb(var(--color-secondary-bg))',
          foreground: 'rgb(var(--color-main-text))',
        },
        primary: {
          DEFAULT: 'rgb(var(--color-light-green))',
          foreground: 'rgb(var(--color-secondary-bg))',
        },
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary-bg))',
          foreground: 'rgb(var(--color-secondary-text))',
        },
        muted: {
          DEFAULT: 'rgb(var(--color-secondary-bg))',
          foreground: 'rgb(var(--color-third-text))',
        },
        accent: {
          DEFAULT: 'rgb(var(--color-purpure))',
          foreground: 'rgb(var(--color-secondary-bg))',
        },
        destructive: {
          DEFAULT: 'rgb(var(--color-orange))',
          foreground: 'rgb(var(--color-main-text))',
        },
        'main-bg': 'rgb(var(--color-main-bg))',
        'main-text': 'rgb(var(--color-main-text))',
        'secondary-bg': 'rgb(var(--color-secondary-bg))',
        'secondary-text': 'rgb(var(--color-secondary-text))',
        'third-text': 'rgb(var(--color-third-text))',
        'light-green': 'rgb(var(--color-light-green))',
        'dark-grey': 'rgb(var(--color-dark-grey))',
        orange: 'rgb(var(--color-orange))',
        purpure: 'rgb(var(--color-purpure))',
        red: 'rgb(var(--color-red))',
      },
      animation: {
        'token-input-loading': 'token-input-loading 1s linear infinite',
      },
    },
  },
  plugins: [animate],
} satisfies Config;

export default config;
