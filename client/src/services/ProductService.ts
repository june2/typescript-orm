import axios from 'axios';
import { API_HOST } from '~constants';
import { ApiResponse } from '~services/types';
import { Category } from '~services/CategoryService';
import { Option, OptionDto } from '~services/OptionService';
import AuthStore from '~stores/auth/AuthStore';

export type ProductRegistrationDto = {
  userId?: string;
  image: File;
  categoryId: number;
  title: string;
  description: string;
  price: number;
  options: OptionDto[];
}

export type ProductDto = {
  id: number;
  userId: string;
  title: string;
  image: string;
  category: Category;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  options: Option[];
}

class ProductService {

  constructor(private authStore: AuthStore) {
  }

  async registration(body: ProductRegistrationDto): Promise<ApiResponse<ProductDto>> {
    if (this.authStore.auth == null) {
      throw new Error('need to login!');
    }
    const formData = new FormData();
    formData.append('image', body.image);
    formData.append('userId', String(this.authStore.auth.id));
    formData.append('categoryId', String(body.categoryId));
    formData.append('title', body.title);
    formData.append('description', body.description);
    formData.append('price', String(body.price));
    formData.append('options', JSON.stringify(body.options));

    return axios.post<ProductRegistrationDto, ApiResponse<ProductDto>>(`${API_HOST}/products`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }

  async getAll(): Promise<ApiResponse<ProductDto[]>> {
    return axios.get(`${API_HOST}/products`);
  }

  async getAllByCategory(categoryId: number): Promise<ApiResponse<ProductDto[]>> {
    return axios.get(`${API_HOST}/products?categoryId=${categoryId}`);
  }

  async getById(id: string): Promise<ApiResponse<ProductDto>> {
    return axios.get(`${API_HOST}/products/${id}`);
  }

}

export default ProductService;
