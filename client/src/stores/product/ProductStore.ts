import { action, observable, toJS } from 'mobx';
import ProductService, { ProductDto, ProductRegistrationDto } from '~services/ProductService';
import { OptionDto } from '~services/OptionService';
import autobind from 'autobind-decorator';

@autobind
class ProductsStore {
  @observable products: ProductDto[] = [];
  @observable detailProduct: ProductDto = {} as ProductDto;

  constructor(private productService: ProductService) {
  }

  @action
  async getAllProducts() {
    const response = await this.productService.getAll();
    this.setProducts(response.data.data);
  }

  @action
  async getProductsByCategory(categoryId: number, options: OptionDto[] = []) {
    let filter: string = '';
    if (options.length > 0) {
      filter = JSON.stringify(toJS(options));
    }
    const response = await this.productService.getAllByCategory(categoryId, filter);
    this.setProducts(response.data.data);
  }

  @action
  async getProduct(id: string) {
    const response = await this.productService.getById(id);
    this.setDetailProduct(response.data.data);
  }

  @action
  async registrationProduct(product: ProductRegistrationDto) {
    try {
      const result = await this.productService.registration(product);
      alert(result.data.msg);
    } catch (e) {
      alert(e.response.data.msg);
    }
  }

  @action
  setProducts(products: ProductDto[]) {
    this.products = products;
  }

  @action
  setDetailProduct(product: ProductDto) {
    this.detailProduct = product;
  }
}

export default ProductsStore;
