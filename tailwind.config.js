module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#121212',
          text: '#e0e0e0',
          nav: '#1f1f1f',
          sidebar: '#242424',
          sidebarText: '#bdbdbd',
          btn: '#424242',
          btnHover: '#616161',
          table: '#1f1f1f',
          tableBorder: '#424242',
        },
        light: {
          bg: '#f7fafc',
          text: '#333',
          nav: '#007bff',
          sidebar: '#343a40',
          sidebarText: '#fff',
          btn: '#007bff',
          btnHover: '#0056b3',
          table: '#fff',
          tableBorder: '#dee2e6',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
