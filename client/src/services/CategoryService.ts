import axios from 'axios';
import { API_HOST } from '~constants';
import { ApiResponse } from '~services/types';

export interface Category {
  readonly id: number;
  readonly title: string;
}

export type CategoryDto = {
  id: number;
  title: string;
}

class CategoryService {

  constructor(private authStore: AuthStore) {
  }

  async getAll(): Promise<ApiResponse<CategoryDto[]>> {
    return axios.get(`${API_HOST}/categories`);
  }
}

export default CategoryService;
