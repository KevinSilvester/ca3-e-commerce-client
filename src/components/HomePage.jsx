import { Component } from 'react'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import {
   ACCESS_LEVEL_ADMIN,
   ACCESS_LEVEL_NORMAL_USER,
   ACCESS_LEVEL_GUEST
} from '../config/constants'
import { api } from '../utils/api'
import Nav from './Nav'
import Filter from './Filter'
import { isEqual } from 'lodash'

export default class HomePage extends Component {
   constructor(props) {
      super(props)
      this.state = {
         products: [],
         length: 0,
         loading: true,
         error: false,
         allBrands: [],
         maxPrice: 0,
         search_query: '',
         filter_brand: [],
         filter_category: [],
         filter_gender: [],
         filter_price_min: 0,
         filter_price_max: undefined,
         sort_key: '',
         sort_order: -1,
         showFilter: false
      }
   }

   getAllProducts = async () => {
      try {
         const {
            search_query,
            filter_brand,
            filter_category,
            filter_gender,
            filter_price_max,
            filter_price_min,
            sort_key,
            sort_order
         } = this.state
         const query = queryString.stringify(
            {
               search_query,
               filter_brand,
               filter_category,
               filter_gender,
               filter_price_max,
               filter_price_min,
               sort_key,
               sort_order
            },
            { arrayFormat: 'bracket' }
         )
         const { data: productsData } = await api.get(`/products/?${query}`)
         if (!productsData.success) throw 'Server Error'
         this.setState({
            products: productsData.products,
            length: productsData.length,
            loading: false,
         })
      } catch (error) {
         this.setState({ error: true })
         console.error({ message: 'Failed to get all products', error })
      }
   }

   getProductsInfo = async () => {
      try {
         const { data: productsInfo } = await api.get('/products/info')
         if (!productsInfo.success) throw 'Server Error'
         this.setState({
            loading: false,
            allBrands: productsInfo.allBrands,
            maxPrice: productsInfo.maxPrice
         })
      } catch (error) {
         this.setState({ error: true })
         console.error({ message: 'Failed to get all products', error })
      }
   }

   toggleShowFilter = () => {
      this.state.showFilter ? enableBodyScroll(document.body) : disableBodyScroll(document.body)
      this.setState({ showFilter: !this.state.showFilter })
   }

   setSearchQuery = value => this.setState({ search_query: value })
   setFilterBrand = value => this.setState({ filter_brand: value })
   setFilterCategory = value => this.setState({ filter_category: value })
   setFilterGender = value => this.setState({ filter_gender: value })
   setFilterPriceMax = value => this.setState({ filter_price_max: value })
   setFilterPriceMin = value => this.setState({ filter_price_min: value })
   setSortKey = value => this.setState({ sort_key: value })
   setSortOrder = value => this.setState({ sort_order: value })

   componentDidMount() {
      this.getAllProducts()
      this.getProductsInfo()
   }

   componentDidUpdate(prevProps, prevState) {
      if (
         !isEqual(this.state.filter_brand.sort(), prevState.filter_brand.sort()) ||
         !isEqual(this.state.filter_category.sort(), prevState.filter_category.sort()) ||
         !isEqual(this.state.filter_gender.sort(), prevState.filter_gender.sort()) ||
         this.state.search_query !== prevState.search_query ||
         this.state.filter_price_min !== prevState.filter_price_min ||
         this.state.filter_price_max !== prevState.filter_price_max ||
         this.state.sort_key !== prevState.sort_key ||
         this.state.sort_order !== prevState.sort_order
      ) {
         this.getAllProducts()
      }
   }

   render() {
      const { length, products, allBrands, maxPrice, loading, showFilter } = this.state
      return (
         <>
            <Nav />
            {!loading && maxPrice && (
               <Filter
                  setFilterBrand={this.setFilterBrand}
                  setFilterCategory={this.setFilterCategory}
                  setFilterGender={this.setFilterGender}
                  setFilterPriceMax={this.setFilterPriceMax}
                  setFilterPriceMin={this.setFilterPriceMin}
                  setSortKey={this.setSortKey}
                  setSortOrder={this.setSortOrder}
                  toggleShowFilter={this.toggleShowFilter}
                  allBrands={allBrands}
                  maxPrice={maxPrice}
                  showFilter={showFilter}
               />
            )}
            <section className='mt-20 w-full h-20 flex items-center justify-between px-5 border-t-[1px] border-b-[1px] border-transparent'>
               <div className='font-bold text-lg'>{length} Products</div>
               <button
                  className='w-11 h-11 bg-custom-white-100 grid place-items-center rounded-md shadow-md group'
                  onClick={this.toggleShowFilter}
               >
                  <svg
                     className='h-3/5 fill-custom-slate-400 group-hover:fill-custom-blue-200 duration-75'
                     xmlns='http://www.w3.org/2000/svg'
                     viewBox='0 0 512 512'
                  >
                     <path d='M0 416C0 398.3 14.33 384 32 384H86.66C99 355.7 127.2 336 160 336C192.8 336 220.1 355.7 233.3 384H480C497.7 384 512 398.3 512 416C512 433.7 497.7 448 480 448H233.3C220.1 476.3 192.8 496 160 496C127.2 496 99 476.3 86.66 448H32C14.33 448 0 433.7 0 416V416zM192 416C192 398.3 177.7 384 160 384C142.3 384 128 398.3 128 416C128 433.7 142.3 448 160 448C177.7 448 192 433.7 192 416zM352 176C384.8 176 412.1 195.7 425.3 224H480C497.7 224 512 238.3 512 256C512 273.7 497.7 288 480 288H425.3C412.1 316.3 384.8 336 352 336C319.2 336 291 316.3 278.7 288H32C14.33 288 0 273.7 0 256C0 238.3 14.33 224 32 224H278.7C291 195.7 319.2 176 352 176zM384 256C384 238.3 369.7 224 352 224C334.3 224 320 238.3 320 256C320 273.7 334.3 288 352 288C369.7 288 384 273.7 384 256zM480 64C497.7 64 512 78.33 512 96C512 113.7 497.7 128 480 128H265.3C252.1 156.3 224.8 176 192 176C159.2 176 131 156.3 118.7 128H32C14.33 128 0 113.7 0 96C0 78.33 14.33 64 32 64H118.7C131 35.75 159.2 16 192 16C224.8 16 252.1 35.75 265.3 64H480zM160 96C160 113.7 174.3 128 192 128C209.7 128 224 113.7 224 96C224 78.33 209.7 64 192 64C174.3 64 160 78.33 160 96z' />
                  </svg>
               </button>
            </section>
            <main className='my-5 w-full h-fit relative px-5 grid grid-cols-2 gap-3'>
               {products.map(product => (
                  <Link
                     to={`product/${product._id}`}
                     key={product._id}
                     className='w-full bg-custom-white-100 rounded-md shadow-md p-1 h-fit'
                  >
                     <div className='w-full h-44 overflow-hidden rounded-md'>
                        <img className='object-cover' src={product.photo} alt={product.name} />
                     </div>
                     <span className='font-bold'>{product.name}</span>
                     <br />
                     <span className='text-sm'>€{product.price}</span>
                  </Link>
               ))}
            </main>
         </>
      )
   }
}