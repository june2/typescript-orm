import AuthStore from '~stores/auth/AuthStore';
import { FilterDetail } from '~services/FilterService';

export interface Option {
  readonly value: string;
  readonly type: string;
  readonly filter: FilterDetail;
}

export interface OptionDto {
  filterId: number;
  type?: string;
  value: any;
}

class OptionService {
  constructor(private authStore: AuthStore) {
  }
}

export default OptionService;
