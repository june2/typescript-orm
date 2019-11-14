import axios from 'axios';
import { API_HOST } from '~constants';
import { ApiResponse } from '~services/types';
import AuthStore from '~stores/auth/AuthStore';
import { FilterDetail } from '~services/FilterService';

export interface Option {
  readonly value: string;
  readonly filter: FilterDetail;
}

export type OptionDto = {
  id: number;
  value: string;
}

class OptionService {

  constructor(private authStore: AuthStore) {
  }

}

export default OptionService;
