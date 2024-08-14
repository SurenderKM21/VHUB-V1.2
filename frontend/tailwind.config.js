/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'red', // Customize this value
        plight:'#FF4000' ,
        primaryDark: '#8B0000', // Customize this value
        darkGray: 'black', // Customize this value
        lightGray: '#D3D3D3', 
        white:'white',// Customize this value
        
      },
    },
  },
  plugins: [],
}