/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffc419',
        'light-primary': '#ffd866',
        'dark-primary': '#b28400',
        'darker-primary': '#7f5e00',
        error: '#f65959',
        'text-error': '#f32929',
        success: '#58bf7e',
        'text-success': '#3fa565',
        white: '#fafafa',
        black: '#1f1f1f',
        'text-black': '#2d2d2d'
      },

      fontSize: {
        '2-5xl': '1.7rem'
      },

      borderWidth: {
        '3': '3px'
      },

      maxWidth: {
        'xss': '15rem'
      },

      spacing: {
        '68': '17rem'
      },

      screens: {
        'landscape': {'raw': '(orientation: landscape)'}
      },

      keyframes: {
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' }
        }
      },

      animation: {
        shake: 'shake .5s cubic-bezier(.36,.07,.19,.97) both'
      }
    }
  },

  variants: {
    extend: {
      backgroundColor: ['active', 'disabled'],
      pointerEvents: ['disabled']
    }
  },

  plugins: []
}
