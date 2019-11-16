import { action, observable } from 'mobx';
import CategoryService, { CategoryDto } from '~services/CategoryService';
import autobind from 'autobind-decorator';

@autobind
class CategoryStore {
  @observable categries: CategoryDto[] = [];
  @observable categoryId: number = 0;
  @observable title: string = '';

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

  @action
  setCategoryId(categoryId: number) {
    this.categoryId = categoryId;
  }

  @action
  setTitle(title: string) {
    this.title = title;
  }
}

export default CategoryStore;
