import { createSelector } from 'reselect';
import { toJS } from 'immutable';
/**
 * Direct selector to the store state domain
 */
const selectStoreDomain = () => state => state.get('store');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Store
 */

const selectStore = () => createSelector(
  selectStoreDomain(),
  (substate) => substate
);

const selectProducts = () => createSelector(
  selectStoreDomain(),
  (globalState) => globalState.get('products')
);
const selectOrder = () => createSelector(
  selectStoreDomain(),
  (globalState) => globalState.get('order').toJS()
);

const selectDescription = () => createSelector(
  selectStoreDomain(),
  (globalState) => globalState.get('description')
);

const selectEventImg = () => createSelector(
  selectStoreDomain(),
  (globalState) => globalState.get('eventImg')
);

const selectFooter = () => createSelector(
  selectStoreDomain(),
  (globalState) => globalState.get('footer')
);

export default selectStore;
export {
  selectStoreDomain,
  selectProducts,
  selectOrder,
  selectDescription,
  selectEventImg,
  selectFooter
};
