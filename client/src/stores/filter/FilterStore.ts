import { action, observable } from 'mobx';
import FilterService, { FilterDto } from '~services/FilterService';
import autobind from 'autobind-decorator';

@autobind
class FilterStore {
  // topbar filter Icon 노출 여부
  @observable isVisible: boolean = false;
  // topbar filter active 여부
  @observable isActive: boolean = false;
  // filter modal open 여부
  @observable isModalOpen: boolean = false;
  // filter data
  @observable filters: FilterDto[] = [];

  constructor(private filterService: FilterService) {
  }

  @action
  async getFilterByCategory(categoryId: number) {
    const response = await this.filterService.getByCategoryId(categoryId);
    this.setFilter(response.data.data);
  }

  @action
  setFilter(filters: FilterDto[]) {
    this.filters = filters;    
    if (filters.length !== 0) this.isVisible = true;
    else this.isVisible = false;
  }

  @action
  setIsActive(isActive: boolean) {
    this.isActive = isActive;
  }

  @action
  setIsModalOpen(isModalOpen: boolean) {
    this.isModalOpen = isModalOpen;
  }
}

export default FilterStore;
