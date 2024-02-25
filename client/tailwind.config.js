import flowbitePlugin from 'flowbite/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './formkit.theme.ts',
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',

    // .. for monorepo
    '../node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
    '../node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: [flowbitePlugin],
  theme: {
    fontFamily: {
      body: ['"Inter var"', '"Inter"', '"Open Sans"', 'Helvetica', '', 'sans-serif', 'Montserrat'],
      mono: ['"Fira Code"', 'monospace'],
    },
  },
}
