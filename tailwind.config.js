/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,handlebars,ts}',
    './src/components/**/*.{html,js,handlebars,ts}',
    './src/components/**/**/*.{html,js,handlebars,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

