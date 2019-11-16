import React, { Component } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { PAGE_PATHS, STORES } from '~constants';
import { inject, observer } from 'mobx-react';
import ProductsStore from '~stores/product/ProductStore';
import CategoryStore from '~stores/category/CategoryStore';
import FilterStore from '~stores/filter/FilterStore';
import Footer from '~components/Footer';
import FixedTopBar from '~components/FixedTopBar';
import Product from '~pages/ProductList/Product';

interface InjectedProps {
  [STORES.PRODUCTS_STORE]: ProductsStore;
  [STORES.CATEGORIES_STORE]: CategoryStore;
  [STORES.FILTERS_STORE]: FilterStore;
}

interface State {
  title: string;
  categoryId: number,
}

@inject(STORES.PRODUCTS_STORE, STORES.CATEGORIES_STORE, STORES.FILTERS_STORE)
@observer
class ProductList extends Component<InjectedProps & RouteComponentProps & State> {

  state: State = {
    title: '',
    categoryId: 0,
  }

  componentDidMount(): void {
    this.getAll();
  }

  getAll(): void {
    this.setState({ title: '중고 거래 제품', categoryId: 0 });
    this.props[STORES.PRODUCTS_STORE].getAllProducts();
    this.props[STORES.FILTERS_STORE].setIsVisible(false);
  }

  getAllByCategory(categoryId: number, category: string): void {
    this.setState({ title: `중고 ${category} 목록`, categoryId: categoryId });
    this.props[STORES.PRODUCTS_STORE].getProductsByCategory(categoryId);
    this.props[STORES.FILTERS_STORE].getFilterByCategory(categoryId);
    this.props[STORES.CATEGORIES_STORE].setTitle(category);
    this.props[STORES.CATEGORIES_STORE].setCategoryId(categoryId);
  }

  render() {
    const { products } = this.props[STORES.PRODUCTS_STORE];
    const { categries } = this.props[STORES.CATEGORIES_STORE];
    return (
      <>
        <FixedTopBar />
        <div className="container container-main-index">
          <h5 className="container-headline">{this.state.title}</h5>

          <div className="categories-group">
            <Link to={PAGE_PATHS.PRODUCT_LISTS}
              className={"btn btn-category " + ((this.state.categoryId === 0) ? " active" : "")}
              onClick={() => this.getAll()}>
              ALL
            </Link>

            {categries.map((item, i) =>
              <Link key={i} to={PAGE_PATHS.PRODUCT_LISTS}
                className={"btn btn-category " + ((this.state.categoryId === item.id) ? " active" : "")}
                onClick={() => this.getAllByCategory(item.id, item.title)}>
                {item.title}
              </Link>)}
          </div>

          <ul className="list-products row">
            {products.map(v => (
              <li
                key={v.id}
                className="list-products-item col-12 col-md-4 col-lg-3"
              >
                <Link to={`${PAGE_PATHS.PRODUCT}/${v.id}`}>
                  <Product product={v} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </>
    );
  }
}

export default ProductList