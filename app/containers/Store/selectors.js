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
  (globalState) => {
    if (globalState.get('products')[0] && globalState.get('products')[0].id) {
      return globalState.get('products');
    }
    return globalState.get('products').toJS();
  }
);
const selectOrder = () => createSelector(
  selectStoreDomain(),
  (globalState) => globalState.get('order').toJS()
);

// const selectHeaderImg = () => createSelector(
//   selectStoreDomain(),
//   (globalState) => globalState.get('headerImg')
// );
//
// const selectDescription = () => createSelector(
//   selectStoreDomain(),
//   (globalState) => globalState.get('description')
// );
//
// const selectEventImg = () => createSelector(
//   selectStoreDomain(),
//   (globalState) => globalState.get('eventImg')
// );
//
// const selectFooter = () => createSelector(
//   selectStoreDomain(),
//   (globalState) => globalState.get('footer')
// );

const selectContent = () => createSelector(
  selectStoreDomain(),
  (globalState) => globalState.get('content').toJS()
);

export default selectStore;
export {
  selectStoreDomain,
  selectProducts,
  selectOrder,
  selectContent
  // selectDescription,
  // selectEventImg,
  // selectFooter
};
