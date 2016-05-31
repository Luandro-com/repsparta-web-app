import expect from 'expect';
import storeReducer from '../reducer';
import { fromJS } from 'immutable';

describe('storeReducer', () => {
  it('returns the initial state', () => {
    expect(storeReducer(undefined, {})).toEqual(fromJS({}));
  });
});
