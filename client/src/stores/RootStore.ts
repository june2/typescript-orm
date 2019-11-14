import AuthStore from './auth/AuthStore';
import ProductsStore from '~stores/product/ProductStore';
import ProductService from '~services/ProductService';
import CategoryStore from '~stores/category/CategoryStore';
import CategoryService from '~services/CategoryService';

export default class RootStore {
  static instance: RootStore;

  authStore = new AuthStore();
  productsStore = new ProductsStore(new ProductService(this.authStore));
  categoriesStore = new CategoryStore(new CategoryService(this.authStore));  
}