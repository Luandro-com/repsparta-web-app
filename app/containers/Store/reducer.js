/*
 *
 * Store reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SAVE_PRODUCTS, SAVE_DESCRIPTION
} from './constants';

const initialState = fromJS({
  description: null,
  products: []
});

function storeReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_PRODUCTS:
      return state
        .set('products', action.payload);
    case SAVE_DESCRIPTION:
      return state
        .set('description', action.payload)
    default:
      return state;
  }
}

export default storeReducer;
