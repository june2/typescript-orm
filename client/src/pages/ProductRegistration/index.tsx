import React, { ChangeEvent, FormEvent, useState } from 'react';
import { STORES } from '~constants';
import { inject, observer } from 'mobx-react';
import ProductsStore from '~stores/product/ProductStore';
import CategoryStore from '~stores/category/CategoryStore';
import FilterStore from '~stores/filter/FilterStore';
import { OptionDto } from '~services/OptionService';
import { FilterItemDto } from '~services/FilterService';
import BackTopBar from '~components/BackTopBar';
import Footer from '~components/Footer';

interface InjectedProps {
  [STORES.PRODUCTS_STORE]: ProductsStore;
  [STORES.CATEGORIES_STORE]: CategoryStore;
  [STORES.FILTERS_STORE]: FilterStore;
}

const ProductRegistration = inject(STORES.PRODUCTS_STORE, STORES.CATEGORIES_STORE, STORES.FILTERS_STORE)(observer((props: InjectedProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState();
  const [fileName, setFileName] = useState('파일선택');
  const [image, setImage] = useState();
  const [options, setOptions] = useState<OptionDto[]>([]);
  const { categries } = props[STORES.CATEGORIES_STORE];
  const { filters } = props[STORES.FILTERS_STORE];

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files != null && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
      setImage(event.target.files[0]);
    }
  };

  const onCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    let categoryId = event.target.value ? Number(event.target.value) : undefined;
    setCategoryId(categoryId);
    setOptions([]); // 옵션 초기화
    if (categoryId) getOptions(categoryId);
  };

  const onRegister = async (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    await props.productsStore.registrationProduct({
      image,
      categoryId,
      title,
      description,
      price,
      options
    });
  };

  const getOptions = async (categoryId: number) => {
    props[STORES.FILTERS_STORE].setFilter([]);
    await props[STORES.FILTERS_STORE].getFilterByCategory(categoryId);
  }

  const setOption = (filterId: number, value: number) => {
    let index = options.findIndex(o => o.filterId === filterId);
    if (index === -1) options.push({ filterId: filterId, value: value });
    else options[index].value = value;
  }

  return (
    <>
      <BackTopBar />
      <div className="container container-sm container-item-create">
        <h5 className="container-headline">중고거래 상품 등록</h5>

        <form className="form-item-create" onSubmit={onRegister}>
          <div className="form-group form-picture">
            <div className="file-box">
              <input className="upload-name" value={fileName} disabled />
              <label htmlFor="ex_filename" className="btn btn-secondary">업로드</label>
              <input type="file" id="ex_filename" className="upload-hidden" onChange={onFileChange} />
            </div>
          </div>

          <div className="form-group form-title">
            <input type="text" className="form-control" id="productsTitle" placeholder="제품 이름을 입력해주세요." value={title}
              onChange={v => setTitle(v.target.value)} />
          </div>
          <div className="form-group form-category">
            <select id="productsCategory" className="form-control" value={categoryId} onChange={onCategoryChange}>
              <option value={undefined}>카테고리를 선택해주세요.</option>
              {categries.map((item, i) =>
                <option key={i} value={item.id}>{item.title}</option>
              )}
            </select>
          </div>
          <div className="form-group form-price">
            <input type="number" className="form-control" id="productsPrice" min="0" step="1000" value={price}
              onChange={v => setPrice(Number(v.target.value))}
              placeholder="가격을 입력해주세요. (￦)" />
          </div>
          <div className="form-group form-description">
            <textarea className="form-control" id="productsDescription" rows={10} value={description}
              onChange={v => setDescription(v.target.value)}
              placeholder="제품 설명을 작성해주세요." />
          </div>
          {
            //TODO: component 분리 필요!
            filters.map((obj, i) => {
              switch (obj.type) {
                // select box (min, max)
                case 'RANGE':
                  const item: FilterItemDto = obj.items[0];
                  let options: any = [];
                  for (let i = item.min; i <= item.max; i++) {
                    options.push(<option key={i} value={i}>{i + item.desc}</option>)
                  }
                  return (<div key={i} className="form-group form-car-model-year">
                    <select id="carModelYear" className="form-control" onChange={(v) => setOption(obj.id, Number(v.target.value))} >
                      <option value="">{obj.desc}</option>
                      {options}
                    </select>
                  </div>)
                // input type
                case 'RANGE_TEXT':
                  return (<div key={i} className="form-group form-car-mileage">
                    <input onChange={(v) => setOption(obj.id, Number(v.target.value))}
                      type="number" className="form-control" id="carMileage" placeholder={obj.desc} />
                  </div>)
                // radio box (multi choice)
                case 'CHOICE':
                  const arr: FilterItemDto[] = obj.items;
                  return (<div key={i} className="form-group form-car-smoking">
                    <label>{obj.title}</label>
                    {arr.map((item, i) =>
                      <div key={i} className="form-check form-check-inline form-check-nonsmoking">
                        <input onChange={() => setOption(obj.id, item.value)}
                          className="form-check-input" type="radio" name={`${obj.id}`} id={`${item.value}`} />
                        <label className="form-check-label non-smoker" htmlFor={`${item.value}`}>{item.desc}</label>
                      </div>
                    )}
                  </div>)
                default:
                  return null;
              }
            })}
          <button className="btn btn-primary btn-submit">상품 등록하기</button>
        </form>
      </div>

      <Footer />
    </>
  );
}));

export default ProductRegistration;