/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    
  ],
  theme: {
    extend: {},
        screens: {
       'xs': '30rem',   // 480px si 1rem = 16px
      'sm': '40rem',   // 640px
      'md': '48rem',   // 768px
      'lg': '64rem',   // 1024px
      'xl': '80rem',   // 1280px
      '2xl': '96rem',  // 1536px
      '3xl': '125rem',
    }
  },
  plugins: [],
};
