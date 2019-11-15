import AuthStore from '~stores/auth/AuthStore';
import { FilterDetail } from '~services/FilterService';

export interface Option {
  readonly value: string;
  readonly filter: FilterDetail;
}

export interface OptionDto {  
  filterId: number;
  value: number;
}

class OptionService {
  constructor(private authStore: AuthStore) {
  }
}

export default OptionService;
