import { action, observable } from 'mobx';
import CategoryService, { CategoryDto } from '~services/CategoryService';
import autobind from 'autobind-decorator';

@autobind
class CategoryStore {
  @observable categries: CategoryDto[] = [];

  constructor(private categoryService: CategoryService) {    
  }

  @action
  async getAllCategories() {    
    const response = await this.categoryService.getAll();
    this.setCategories(response.data.data);
  }

  @action
  setCategories(categries: CategoryDto[]) {    
    this.categries = categries;
  }
}

export default CategoryStore;
