/*
 *
 * Store reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SAVE_PRODUCTS, SAVE_DESCRIPTION, SAVE_FOOTER
} from './constants';

const initialState = fromJS({
  description: null,
  eventImg: null,
  footer: null,
  products: []
});

function storeReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_PRODUCTS:
      return state
        .set('products', action.payload);
    case SAVE_DESCRIPTION:
      return state
        .set('description', action.payload.description)
        .set('eventImg', action.payload.eventImg)
    case SAVE_FOOTER:
      return state
        .set('footer', action.payload);
    default:
      return state;
  }
}

export default storeReducer;
