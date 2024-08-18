/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        redhattextregular:['Regular'],
        redhattextsemibold:['Bold'],
        redhattextbold:['SemiBold'],
      },
      boxShadow:{
        'cartshadow':'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',      
      },
      screens:{
        'new-2sm':'300px',
        'new-sm':'500px',
        'new-md':'800px',
        'new-lg':'1025px',
        'new-xl':'1200px',
        'new-2xl':'1400px',
      },
    },
  },
  plugins: [],
}

