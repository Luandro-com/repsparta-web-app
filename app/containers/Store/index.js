/*
 *
 * Store
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectProducts, selectOrder, selectDescription, selectEventImg, selectFooter } from './selectors';
import { fetchProducts, fetchDescription, fetchFooter, postOrder } from './actions';

import Intro from 'components/Intro';
import Shop from 'components/Shop';
import Footer from 'components/Footer';

export class Store extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { fetchProducts, fetchDescription, fetchFooter } = this.props;
    fetchFooter();
    fetchProducts();
    fetchDescription();
  }

  render() {
    const { products, order, description, postOrder, eventImg, footer } = this.props;
    return (
      <div>
        <Intro description={description} />
        <Shop products={products} order={order} postOrder={postOrder} eventImg={eventImg} />
        <Footer footer={footer} />
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  selectProducts(),
  selectOrder(),
  selectDescription(),
  selectEventImg(),
  selectFooter(),
  (products, order, description, eventImg, footer) => ({ products, order, description, eventImg, footer })
);

function mapDispatchToProps(dispatch) {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    fetchDescription: () => dispatch(fetchDescription()),
    fetchFooter: () => dispatch(fetchFooter()),
    postOrder: (userInfo, cart) => dispatch(postOrder(userInfo, cart)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Store);
