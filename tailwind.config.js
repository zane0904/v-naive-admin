module.exports = {
  mode: 'jit',
  media: false,
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: [require('tailwindcss'), require('autoprefixer')],
  corePlugins: {
    preflight: false
  }
}
