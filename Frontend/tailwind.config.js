/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#4dab00',         // NComputing green
        'brand-dark': '#3d8a00',
        'brand-light': '#e8f7d9',
        nc: {
          dark: '#1a1c20',        // dark header / footer
          body: '#333333',
          mid: '#666666',
          light: '#85868c',
          border: '#e3e3e3',
          bg: '#f7f7f7',
          bgcard: '#f0f0f0',
          highlight: '#fff5cb',   // callout yellow
          blue: '#1e73be',
          'blue-light': '#0693e3',
        },
      },
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
        open: ['"Open Sans"', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        '13': '13px',
        '14': '14px',
        '15': '15px',
        '16': '16px',
        '17': '17px',
        '20': '20px',
        '34': '34px',
        '44': '44px',
        '80': '80px',
      },
      boxShadow: {
        card: '0 2px 12px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.14)',
        modal: '0 20px 60px rgba(0,0,0,0.18)',
      },
    },
  },
  plugins: [],
}
