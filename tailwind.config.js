const forms = require('@tailwindcss/forms')

const hsl = variable => ({ opacityValue }) => {
   if (!opacityValue) 
      return `hsl(var(${variable}))`
   return `hsl(var(${variable}) / ${opacityValue})`
}

module.exports = {
   content: ['./src/**/*.{js,jsx,ts,tsx}'],
   darkMode: 'class',
   theme: {
      extend: {
         colors: {
            custom: {
               slate: {
                  50: hsl('--slate-50'),
                  100: hsl('--slate-100'),
                  200: hsl('--slate-200'),
                  300: hsl('--slate-300'),
                  400: hsl('--slate-400'),
               },
               blue: {
                  100: hsl('--blue-100'),
                  200: hsl('--blue-200'),
               },
               navy: {
                  100: hsl('--navy-100'),
                  200: hsl('--navy-200'),
                  300: hsl('--navy-300'),
                  400: hsl('--navy-400'),
                  500: hsl('--navy-500'),
                  600: hsl('--navy-600'),
                  700: hsl('--navy-700'),
               },
               white: {
                  100: hsl('--white-100'),
                  200: hsl('--white-200')
               },
               grey: {
                  100: hsl('--grey-100'),
                  200: hsl('--grey-200')
               }
            },
         },
         fontFamily: {
            nunito: ['Nunito', 'sans-serif'],
            oleo: ['Oleo Script', 'cursive']
         },
      }
   },
   variants: {
      extend: {}
   },
   plugins: [forms]
}