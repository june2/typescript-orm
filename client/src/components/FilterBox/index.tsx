import React from 'react';
import { STORES } from '~constants';
import { inject, observer } from 'mobx-react';
import FilterStore from '~stores/filter/FilterStore';
import CategoryStore from '~stores/category/CategoryStore';
import { Modal, Button } from 'react-bootstrap';


type InjectProps = {
  [STORES.FILTERS_STORE]: FilterStore;
  [STORES.CATEGORIES_STORE]: CategoryStore;
}

function FilterBox(props: InjectProps) {

  const save = () => {
    props[STORES.FILTERS_STORE].setIsActive(true);
    close();
  };

  const reset = () => {
    props[STORES.FILTERS_STORE].setIsActive(false);
    close();
  };

  const close = () => {
    props[STORES.FILTERS_STORE].setIsModalOpen(false);
  };

  return (
    <Modal
      show={props[STORES.FILTERS_STORE].isModalOpen}
      onHide={() => props[STORES.FILTERS_STORE].setIsModalOpen(false)}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4 className="modal-title">{props[STORES.CATEGORIES_STORE].title} 조건 설정</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group filter-car-model-year">
          <label>차량 연식 범위</label>
          <input className="input-slider-item" type="text" aria-describedby="sliderCarModelYearHelp" />
          <small id="sliderCarModelYearHelp" className="text-muted">2010년부터 2020년까지</small>
        </div>

        <div className="form-group filter-car-mileage">
          <label>차량 주행 거리</label>
          <input className="input-slider-item" type="text" aria-describedby="sliderCarMileageHelp" />
          <small id="sliderCarMileageHelp" className="text-muted">0km부터 10000km까지</small>
        </div>

        <div className="form-group filter-car-smoking">
          <label>차량 판매자 흡연 여부</label>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="formRadiosSmoking" id="formRadiosSmoking_1" value="option1" />
            <label className="form-check-label" >흡연</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="formRadiosSmoking" id="formRadiosSmoking_2" value="option2" />
            <label className="form-check-label">비흡연</label>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-secondary mr-auto" onClick={reset}>초기화</Button>
        <Button className="btn btn-secondary" onClick={close}>취소</Button>
        <Button className="btn btn-primary" onClick={save}>적용</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default inject(STORES.FILTERS_STORE, STORES.CATEGORIES_STORE)(observer(FilterBox));