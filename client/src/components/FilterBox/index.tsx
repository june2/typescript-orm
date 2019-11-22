import React, { useState } from 'react';
import { STORES } from '~constants';
import { inject, observer } from 'mobx-react';
import ProductsStore from '~stores/product/ProductStore';
import CategoryStore from '~stores/category/CategoryStore';
import FilterStore from '~stores/filter/FilterStore';
import { FilterItemDto } from '~services/FilterService';
import { OptionDto } from '~services/OptionService';
import { Modal, Button } from 'react-bootstrap';
// @ts-ignore
import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';

type InjectProps = {
  [STORES.PRODUCTS_STORE]: ProductsStore;
  [STORES.CATEGORIES_STORE]: CategoryStore;
  [STORES.FILTERS_STORE]: FilterStore;
}

function FilterBox(props: InjectProps) {
  const [options, setOptions] = useState<OptionDto[]>([]);
  const [min, setMin] = useState<any>([]);
  const [max, setMax] = useState<any>([]);
  const { filters, isModalOpen } = props[STORES.FILTERS_STORE];
  const { title, categoryId } = props[STORES.CATEGORIES_STORE];

  /**
   * 필터 값 적용
   */
  const save = () => {
    props[STORES.FILTERS_STORE].setIsActive(true);
    props[STORES.FILTERS_STORE].setConditions(options);
    props[STORES.PRODUCTS_STORE].getProductsByCategory(categoryId, options);
    close();
  };

  /**
   * 필터 값 초기화
   */
  const reset = () => {
    props[STORES.FILTERS_STORE].setIsActive(false);
    props[STORES.PRODUCTS_STORE].getAllProducts();
    setOptions([]);
    close();
  };

  /**
   * 필터 창 close
   */
  const close = () => {
    props[STORES.FILTERS_STORE].setIsModalOpen(false);
  };

  /**
   * 선택/입력 필터 값 저장
   */
  const setOption = (filterId: number, value: number) => {
    let index = options.findIndex(o => o.filterId === filterId);
    if (index === -1) options.push({ filterId: filterId, type: 'DEFAULT', value: value });
    else options[index].value = value;
  }

  /**
   * 필터 값 가져오기
   */
  const getOption = (filterId: number) => {
    let index = options.findIndex(o => o.filterId === filterId);
    if ((index === -1)) return "";
    else return options[index].value;
  }

  /**
   * 범위 필터 값 저장
   */
  const changeRange = (filterId: number, arr: [number, number], i: number) => {
    // 화면 표시값 
    setMin((prev: any) => {
      let newArr = prev.slice(0, 2);
      newArr[i] = arr[0];
      return newArr;
    });
    setMax((prev: any) => {
      let newArr = prev.slice(0, 2);
      newArr[i] = arr[1];
      return newArr;
    });
    // 필터 저장값, arr[0]= min / arr[1]= max 저장
    let index = options.findIndex(o => o.filterId === filterId);
    let value = { min: arr[0], max: arr[1] };
    if (index === -1) {
      options.push({ filterId: filterId, type: 'RANGE', value: value });
    } else {
      options[index].value = value;
    }
  }

  /**
   * 범위 필터 값 저장
   */
  const getRange = (filterId: number, value: number, type: string) => {
    let index = options.findIndex(o => o.filterId === filterId);
    if ((index === -1)) return value;
    else return options[index].value[type];
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
                      className="form-check-input" type="radio" name={`${obj.id}`} id={`${item.value}`}
                      defaultChecked={getOption(obj.id) === item.value}
                    />
                    <label className="form-check-label non-smoker" htmlFor={`${item.value}`}>{item.desc}</label>
                  </div>
                )}
              </div>)
            } else {
              const item: FilterItemDto = obj.items[0];
              min.push(item.min);
              max.push(item.max);
              return (
                <div key={i} className="form-group filter-car-mileage">
                  <label>{obj.title}</label>
                  <div style={{ padding: 6 }}>
                    <Range
                      trackStyle={[{ backgroundColor: '#FFC13D', height: 10 }]}
                      handleStyle={[{ backgroundColor: '#ff8a3d', height: 20, width: 20, border: 'none' }, { backgroundColor: '#ff8a3d', height: 20, width: 20, border: 'none' }]}
                      railStyle={{ height: 10 }}
                      allowCross={false} min={item.min} max={item.max}
                      defaultValue={[getRange(obj.id, item.min, 'min'), getRange(obj.id, item.max, 'max')]}
                      step={1} onChange={(val: any) => changeRange(obj.id, val, i)} />
                  </div>
                  <small className="text-muted">{min[i] + item.desc}부터 {max[i] + item.desc}까지</small>
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