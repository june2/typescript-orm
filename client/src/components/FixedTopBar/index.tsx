import * as React from 'react';
import { Link } from 'react-router-dom';
import { PAGE_PATHS } from '~constants';
import { STORES } from '~constants';
import FilterStore from '~stores/filter/FilterStore';
import FilterBox from '~components/FilterBox';
import { inject, observer } from 'mobx-react';
// @ts-ignore
import LogoImage from '~assets/logo-basic.svg';

type InjectProps = {
  [STORES.FILTERS_STORE]: FilterStore;
};

function FixedTopBar(props: InjectProps) {
  return (
    <nav className="navbar nav-global fixed-top navbar-expand-sm">            
      <div className="container">
        <Link to={PAGE_PATHS.PRODUCT_LISTS}>
          <img className="img-brand" alt="당근마켓" width="132"
            src={LogoImage} />
        </Link>
        <ul className="navbar-nav ml-auto">
          {props[STORES.FILTERS_STORE].isVisible ?
            (<li className="nav-item">
              <FilterBox />
              <button
                onClick={() => props[STORES.FILTERS_STORE].setIsModalOpen(true)}
                className={"btn-filter " + ((props[STORES.FILTERS_STORE].isActive) ? "active" : "")}
                data-toggle="modal" data-target="#section-filter">
                <i className="material-icons ic-filter">filter_list</i>
              </button>
            </li>) :
            null}
          <li className="nav-item">
            <Link to={PAGE_PATHS.PRODUCT_REGISTRATION} >
              <i className="material-icons ic-create">create</i>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default inject(STORES.FILTERS_STORE)(observer(FixedTopBar));