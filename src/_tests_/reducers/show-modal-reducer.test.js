import showModalReducer from '../../reducers/show-modal-reducer';
import * as c from '../../actions/ActionTypes';

describe("showModalReducer", () => {

  test('Should return default state if no action type is recognized', () => {
    expect(showModalReducer(false, { type: null })).toEqual(false);
  });

  test('Should toggle showModal state and return true', () => {
    expect(showModalReducer(false, { type: c.SHOW_MODAL })).toEqual(true);
  });
});