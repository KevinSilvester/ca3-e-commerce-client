// import { AppBar, Toolbar, IconButton } from '@mui/material'
// import { SearchTwoTone } from '@mui/icons-material'
import { Component } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

export default class Nav extends Component {
   constructor(props) {
      super(props)
      this.state = {}
   }

   render() {
      return (
         <>
            <nav className='fixed top-0 left-0 h-16 bg-custom-navy-600 flex items-center justify-around w-full shadow-xl z-10'>
               <div className=''>
                  <button className='bg-custom-navy-300 h-11 w-11 grid place-items-center rounded-md group'>
                     <svg
                        className='h-1/2 fill-custom-slate-300 group-hover:fill-custom-blue-200 duration-75'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 512 512'
                     >
                        <path d='M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z' />
                     </svg>
                  </button>
               </div>
               <Link
                  role='link'
                  aria-label='Link to Home'
                  to='/'
                  className='font-oleo font-semibold text-3xl text-custom-blue-200'
               >
                  JTPH
               </Link>
               <div className='flex gap-x-2'>
                  <Link to='dashboard' className='bg-custom-navy-300 h-11 w-11 grid place-items-center rounded-md group'>
                     <svg
                        className='h-1/2 fill-custom-slate-300 group-hover:fill-custom-blue-200 duration-75'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 448 512'
                     >
                        <path d='M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z' />
                     </svg>
                  </Link>
                  <Link to='cart' className='bg-custom-navy-300 h-11 w-11 grid place-items-center rounded-md group'>
                     <svg
                        className='h-1/2 fill-custom-slate-300 group-hover:fill-custom-blue-200 duration-75'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 576 512'
                     >
                        <path d='M171.7 191.1H404.3L322.7 35.07C316.6 23.31 321.2 8.821 332.9 2.706C344.7-3.409 359.2 1.167 365.3 12.93L458.4 191.1H544C561.7 191.1 576 206.3 576 223.1C576 241.7 561.7 255.1 544 255.1L492.1 463.5C484.1 492 459.4 512 430 512H145.1C116.6 512 91 492 83.88 463.5L32 255.1C14.33 255.1 0 241.7 0 223.1C0 206.3 14.33 191.1 32 191.1H117.6L210.7 12.93C216.8 1.167 231.3-3.409 243.1 2.706C254.8 8.821 259.4 23.31 253.3 35.07L171.7 191.1zM191.1 303.1C191.1 295.1 184.8 287.1 175.1 287.1C167.2 287.1 159.1 295.1 159.1 303.1V399.1C159.1 408.8 167.2 415.1 175.1 415.1C184.8 415.1 191.1 408.8 191.1 399.1V303.1zM271.1 303.1V399.1C271.1 408.8 279.2 415.1 287.1 415.1C296.8 415.1 304 408.8 304 399.1V303.1C304 295.1 296.8 287.1 287.1 287.1C279.2 287.1 271.1 295.1 271.1 303.1zM416 303.1C416 295.1 408.8 287.1 400 287.1C391.2 287.1 384 295.1 384 303.1V399.1C384 408.8 391.2 415.1 400 415.1C408.8 415.1 416 408.8 416 399.1V303.1z' />
                     </svg>
                  </Link>
               </div>
            </nav>
         </>
      )
   }
}
