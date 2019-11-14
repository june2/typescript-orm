import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { toJS } from 'mobx';
import { STORES } from '~constants';
import ProductsStore from '~stores/product/ProductStore';
import BackTopBar from '~components/BackTopBar';
import Footer from '~components/Footer';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import 'moment/locale/ko';

type ProductDetailProps = {
  [STORES.PRODUCTS_STORE]: ProductsStore;
} & RouteComponentProps<{ id: string }>;

function ProductDetail(props: ProductDetailProps) {
  useEffect(() => {
    props[STORES.PRODUCTS_STORE].getProduct(props.match.params.id);
  }, []);

  const { detailProduct } = props[STORES.PRODUCTS_STORE];
  const { image, category, title, price, createdAt, description, options } = detailProduct;
  const time = moment(createdAt);
  const categoryObj = toJS(category);
  const optionArr = toJS(options);

  return (
    <>
      <BackTopBar />
      <div className="container container-sm container-detail">
        <img
          src={image}
          alt=""
          width="100%"
        />
        <h3 className="product-title">{title}</h3>
        <h4 className="product-price" style={{ fontWeight: 'bold' }}>
          {price}원
        </h4>
        <ul className="list-product-information">
          <li className="list-item category">
            카테고리 <span>{(categoryObj) ? categoryObj.title : ''}</span>
          </li>
          <li className="list-item date">
            상품 등록 시간{' '}
            <span>
              <time dateTime="2019-08-20T08:30:00Z">{time.fromNow()}</time>
            </span>
          </li>
          // 추가된 부분!
          {(optionArr) ?
            optionArr.map((item, i) => (
              <li key={i} className="list-item">
                {item.filter.detail} <span>{item.value}</span>
              </li>)
            )
            : null
          }
        </ul>
        <div className="description">{description}</div>
      </div>
      <Footer />
    </>
  );
}

export default inject(STORES.PRODUCTS_STORE)(observer(ProductDetail));
