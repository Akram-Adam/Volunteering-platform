/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
      'custom-image': "url('/src/assets/img/imaga4.jpg')",
      'add-image': "url('/src/assets/img/imaga1.jpg')",
    },},
  },
  plugins: [],
}
