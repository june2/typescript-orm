import React, { useState } from 'react';
import { STORES } from '~constants';
import { inject, observer } from 'mobx-react';
import ProductsStore from '~stores/product/ProductStore';
import CategoryStore from '~stores/category/CategoryStore';
import FilterStore from '~stores/filter/FilterStore';
import { FilterItemDto } from '~services/FilterService';
import { OptionDto } from '~services/OptionService';
import { Modal, Button } from 'react-bootstrap';


type InjectProps = {
  [STORES.PRODUCTS_STORE]: ProductsStore;
  [STORES.CATEGORIES_STORE]: CategoryStore;
  [STORES.FILTERS_STORE]: FilterStore;
}

function FilterBox(props: InjectProps) {
  const [options, setOptions] = useState<OptionDto[]>([]);
  const { filters, isModalOpen } = props[STORES.FILTERS_STORE];
  const { title, categoryId } = props[STORES.CATEGORIES_STORE];

  const save = () => {
    props[STORES.FILTERS_STORE].setIsActive(true);
    props[STORES.FILTERS_STORE].setConditions(options);
    props[STORES.PRODUCTS_STORE].getProductsByCategory(categoryId, options);
    close();
  };

  const reset = () => {
    props[STORES.FILTERS_STORE].setIsActive(false);
    props[STORES.PRODUCTS_STORE].getAllProducts();
    setOptions([]);
    close();
  };

  const close = () => {
    props[STORES.FILTERS_STORE].setIsModalOpen(false);
  };

  const setOption = (filterId: number, value: number) => {
    let index = options.findIndex(o => o.filterId === filterId);
    if (index === -1) options.push({ filterId: filterId, value: value });
    else options[index].value = value;
  }

  return (
    <Modal
      show={isModalOpen}
      onHide={() => props[STORES.FILTERS_STORE].setIsModalOpen(false)}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4 className="modal-title">{title} 조건 설정</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          //TODO: component 분리 필요!
          filters.map((obj, i) => {
            if (obj.type === 'CHOICE') {
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
            } else {
              const item: FilterItemDto = obj.items[0];
              return (
                <div key={i} className="form-group filter-car-mileage">
                  <label>{obj.title}</label>
                  <input className="input-slider-item" type="text" aria-describedby="sliderCarMileageHelp" />
                  <small className="text-muted">{item.min + item.desc}부터 {item.max + item.desc}까지</small>
                </div>
              )
            }
          })}
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-secondary mr-auto" onClick={reset}>초기화</Button>
        <Button className="btn btn-secondary" onClick={close}>취소</Button>
        <Button className="btn btn-primary" onClick={save}>적용</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default inject(STORES.PRODUCTS_STORE, STORES.CATEGORIES_STORE, STORES.FILTERS_STORE)(observer(FilterBox));