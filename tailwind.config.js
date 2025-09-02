/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#010221', // azul oscuro
          light: '#1a1a40',
          dark: '#000024',
        },
        accent: {
          DEFAULT: '#c6ff00', // lime-400
          dark: '#aeea00',
        },
        sidebar: {
          dark: '#10112a',
          light: '#f5f5e9', // beige/hueso claro
        },
        text: {
          dark: '#fff',
          light: '#222',
        },
        bg: {
          dark: '#010221',
          light: '#f5f5e9',
        },
      },
    },
    screens: {
      'sm': '640px',
      'md750': '750px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
}
