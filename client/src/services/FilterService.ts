import axios from 'axios';
import { API_HOST } from '~constants';
import { ApiResponse } from '~services/types';
import AuthStore from '~stores/auth/AuthStore';

export interface Filter {
  readonly id: number;
  readonly type: string;
  readonly title: string;
  readonly desc: string;
  readonly detail: string;
}

export interface FilterDetail {
  readonly detail: string;
}

export type FilterDto = {
  id: number;
  type: string;
  title: string;
  desc: string;
  detail: string;
}

class FilterService {

  constructor(private authStore: AuthStore) {
  }

  async getByCategoryId(categoryId: number): Promise<ApiResponse<FilterDto[]>> {
    return axios.get(`${API_HOST}/filters/${categoryId}`);
  }

}

export default FilterService;
