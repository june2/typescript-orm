import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Login from './pages/Signin';
import PrivateRoute from './components/PrivateRouter';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';
import { PAGE_PATHS, STORES } from '~constants';
import ProductList from '~pages/ProductList';
import Singup from '~pages/Signup';
import ProductRegistration from '~pages/ProductRegistration';
import ProductDetail from '~pages/ProductDetail';
import CategorisedProductList from '~pages/CategorisedProductList';

@inject(STORES.AUTH_STORE, STORES.CATEGORIES_STORE)
@observer
@autobind
export default class App extends Component {
  componentWillMount(): void {
    this.props[STORES.CATEGORIES_STORE].getAllCategories();
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path={PAGE_PATHS.SIGNIN} component={Login} />
          <Route path={PAGE_PATHS.SIGNUP} component={Singup} />
          <PrivateRoute
            path={`${PAGE_PATHS.PRODUCT}/:id`}
            redirectTo={PAGE_PATHS.SIGNIN}
            component={ProductDetail}
          />
          <PrivateRoute
            path={PAGE_PATHS.PRODUCT_LISTS}
            redirectTo={PAGE_PATHS.SIGNIN}
            component={ProductList}
          />
          <PrivateRoute
            path={PAGE_PATHS.PRODUCT_REGISTRATION}
            redirectTo={PAGE_PATHS.SIGNIN}
            component={ProductRegistration}
          />
          <PrivateRoute
            path={PAGE_PATHS.PRODUCT_CATEGORISED_LISTS}
            redirectTo={PAGE_PATHS.SIGNIN}
            component={CategorisedProductList}
          />
          <Redirect from="/" to={PAGE_PATHS.PRODUCT_LISTS} />
        </Switch>
      </Router>
    );
  }
}
