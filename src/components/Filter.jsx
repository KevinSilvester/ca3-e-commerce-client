import { Component } from 'react'
import { motion } from 'framer-motion'
import Slider from '@mui/material/Slider'

export default class Filter extends Component {
   constructor() {
      super()
      this.state = {
         brands: [],
         categories: [],
         sort: '',
         gender: [],
         price: []
      }
      this.categories = ['jacket', 'hoodie', 'pants', 't-shirt']
      this.gender = ['men', 'women', 'unisex']
      this.minDistance = 10
   }

   componentDidMount() {
      this.setState({ price: [0, this.props.maxPrice] })
   }

   handleBrands = e => {
      if (e.target.checked) {
         this.setState({ brands: [...this.state.brands, e.target.value] })
         this.props.setFilterBrand([...this.state.brands, e.target.value])
      } else {
         this.setState({ brands: [...this.state.brands.filter(brand => brand !== e.target.value)] })
         this.props.setFilterBrand([...this.state.brands.filter(brand => brand !== e.target.value)])
      }
   }

   handleCategory = e => {
      if (e.target.checked) {
         this.setState({ categories: [...this.state.categories, e.target.value] })
         this.props.setFilterCategory([...this.state.categories, e.target.value])
      } else {
         this.setState({
            categories: [...this.state.categories.filter(category => category !== e.target.value)]
         })
         this.props.setFilterCategory([
            ...this.state.categories.filter(category => category !== e.target.value)
         ])
      }
   }

   handleGender = e => {
      if (e.target.checked) {
         this.setState({ gender: [...this.state.gender, e.target.value] })
         this.props.setFilterGender([...this.state.gender, e.target.value])
      } else {
         this.setState({
            gender: [...this.state.gender.filter(g => g !== e.target.value)]
         })
         this.props.setFilterGender([...this.state.gender.filter(g => g !== e.target.value)])
      }
   }

   handleSort = e => {
      this.setState({ sort: e.target.value })

      switch (e.target.value) {
         case 'price.desc':
            this.props.setSortOrder(1)
            this.props.setSortKey('price')
            break
         case 'price.asc':
            this.props.setSortOrder(-1)
            this.props.setSortKey('price')
            break
         case 'name.desc':
            this.props.setSortOrder(1)
            this.props.setSortKey('name')
            break
         case 'name.asc':
            this.props.setSortOrder(-1)
            this.props.setSortKey('name')
            break
         default:
            this.props.setSortOrder(1)
            this.props.setSortKey('')
      }
   }

   handlePrice = (e, newValue, activeThumb) => {
      if (!Array.isArray(newValue)) {
         return
      }
      const { price } = this.state

      if (activeThumb === 0) {
         this.setState({ price: [Math.min(newValue[0], price[1] - this.minDistance), price[1]] })
         this.props.setFilterPriceMin(Math.min(newValue[0], price[1] - this.minDistance))
         this.props.setFilterPriceMax(price[1])
      } else {
         this.setState({ price: [price[0], Math.max(newValue[1], price[0] + this.minDistance)] })
         this.props.setFilterPriceMin(price[0])
         this.props.setFilterPriceMax(Math.max(newValue[1], price[0] + this.minDistance))
      }
   }

   handleClearFilter = () => {
      this.setState({ brands: [], categories: [], sort: '', gender: [], price: [0, this.props.maxPrice] })
      this.props.setFilterBrand([])
      this.props.setSortKey('')
      this.props.setSortOrder(-1)
      this.props.setFilterCategory([])
      this.props.setFilterGender([])
      this.props.setFilterPriceMin(0)
      this.props.setFilterPriceMax(undefined)
   }

   render() {
      const { allBrands, maxPrice, showFilter, toggleShowFilter } = this.props

      return (
         <>
            <motion.div
               className='fixed top-0 left-0 z-50 w-full h-full backdrop-blur-sm'
               style={{ background: 'rgb(0 0 0 / var(--bg-opacity))' }}
               onClick={toggleShowFilter}
               initial={{ '--bg-opacity': 0, x: '100%' }}
               animate={
                  showFilter ? { '--bg-opacity': 0.25, x: '0%' } : { '--bg-opacity': 0, x: '100%' }
               }
               transition={{ '--bg-opacity': { delay: 0.25 }, default: { duration: 0.25 } }}
            >
               <motion.div
                  className='absolute h-screen w-[85%] bg-custom-white-200 right-0'
                  onClick={e => e.stopPropagation()}
               >
                  <div className='w-full h-16 bg-custom-navy-600 font-bold text-2xl grid items-center px-5 text-custom-slate-200'>
                     Refine Search
                  </div>
                  <section className='px-4'>
                     <span className='text-2xl font-bold'>Sort</span>
                     <select
                        className='w-full rounded-md bg-custom-white-100 border-0 focus:border-0 focus:ring-0 focus:shadow-none'
                        name='sort'
                        id='sort'
                        onChange={this.handleSort}
                        value={this.state.sort}
                     >
                        <option value='none'>----</option>
                        <option value='price.desc'>Price (Low to High)</option>
                        <option value='price.asc'>Price (High to Low)</option>
                        <option value='name.desc'>Name (A to Z)</option>
                        <option value='name.asc'>Name (Z to A)</option>
                     </select>
                  </section>
                  <div className='w-[90%] mt-5 mb-4 mx-auto border-t-2 border-custom-slate-200'></div>
                  <section className='px-4'>
                     <span className='text-2xl font-bold'>Brands</span>
                     <div className='grid grid-cols-2 gap-3 px-3 py-3 bg-custom-white-100 rounded-md'>
                        {allBrands.map(brand => (
                           <div key={brand} className='flex items-center gap-1'>
                              <input
                                 id={`brand-${brand}`}
                                 type='checkbox'
                                 value={brand}
                                 className='rounded text-custom-blue-100 focus:ring-custom-blue-100 duration-75'
                                 onChange={this.handleBrands}
                              />
                              <label className='font-semibold text-sm' htmlFor={`brand-${brand}`}>
                                 {brand.toUpperCase()}
                              </label>
                           </div>
                        ))}
                     </div>
                  </section>
                  <div className='w-[90%] mt-5 mb-4 mx-auto border-t-2 border-custom-slate-200'></div>
                  <section className='px-4'>
                     <span className='text-2xl font-bold'>Category</span>
                     <div className='grid grid-cols-2 gap-3 px-3 py-3 bg-custom-white-100 rounded-md'>
                        {this.categories.map(category => (
                           <div key={category} className='flex items-center gap-1'>
                              <input
                                 id={`category-${category}`}
                                 type='checkbox'
                                 value={category}
                                 className='rounded text-custom-blue-100 focus:ring-custom-blue-100 duration-75'
                                 onChange={this.handleCategory}
                              />
                              <label
                                 className='font-semibold text-sm'
                                 htmlFor={`category-${category}`}
                              >
                                 {category.toUpperCase()}
                              </label>
                           </div>
                        ))}
                     </div>
                  </section>
                  <div className='w-[90%] mt-5 mb-4 mx-auto border-t-2 border-custom-slate-200'></div>
                  <section className='px-4'>
                     <span className='text-2xl font-bold'>Gender</span>
                     <div className='grid grid-cols-2 gap-3 px-3 py-3 bg-custom-white-100 rounded-md'>
                        {this.gender.map(g => (
                           <div key={g} className='flex items-center gap-1'>
                              <input
                                 id={`gender-${g}`}
                                 type='checkbox'
                                 value={g}
                                 className='rounded text-custom-blue-100 focus:ring-custom-blue-100 duration-75'
                                 onChange={this.handleGender}
                              />
                              <label className='font-semibold text-sm' htmlFor={`gender-${g}`}>
                                 {g.toUpperCase()}
                              </label>
                           </div>
                        ))}
                     </div>
                  </section>
                  <div className='w-[90%] mt-5 mb-4 mx-auto border-t-2 border-custom-slate-200'></div>
                  <section className='px-4'>
                     <span className='text-2xl font-bold'>Price</span>
                     <div className='w-full flex justify-between'>
                        <span>Min: €{this.state.price[0]}</span>
                        <span>Max: €{this.state.price[1]}</span>
                     </div>
                     <div className='w-full grid items-center px-3'>
                        <Slider
                           value={this.state.price}
                           onChange={this.handlePrice}
                           valueLabelDisplay='auto'
                           getAriaValueText={value => `€${value}`}
                           valueLabelFormat={value => `€${value}`}
                           disableSwap
                           min={0}
                           max={Math.ceil(maxPrice / 5) * 5}
                           step={5}
                        />
                     </div>
                  </section>
                  <div className='w-[90%] mt-5 mb-4 mx-auto border-t-2 border-custom-slate-200'></div>
                  <section className='px-4'>
                     <button
                        className='w-full rounded-md bg-custom-blue-200 text-custom-white-100 font-bold py-3'
                        onClick={this.handleClearFilter}
                     >
                        Clear All
                     </button>
                  </section>
               </motion.div>
            </motion.div>
         </>
      )
   }
}
