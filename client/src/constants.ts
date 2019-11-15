export enum STORES {
  AUTH_STORE = 'authStore',
  PRODUCTS_STORE = 'productsStore',
  CATEGORIES_STORE = 'categoriesStore',
  FILTERS_STORE = 'filtersStore',
}

export enum PAGE_PATHS {
  SIGNUP = '/signup',
  SIGNIN = '/signin',
  PRODUCT_LISTS = '/products',  
  PRODUCT_CATEGORISED_LISTS = '/categorised-products',
  PRODUCT = '/products',
  PRODUCT_REGISTRATION = "/products-registration"
}

export const API_HOST = process.env.API_HOST || 'http://localhost:5000/api';