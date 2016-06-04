/*
 *
 * Store
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectProducts, selectOrder, selectDescription, selectEventImg, selectFooter } from './selectors';
import { fetchProducts, fetchDescription, fetchFooter, startPayment } from './actions';

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
    const { products, order, description, startPayment, eventImg, footer } = this.props;
    return (
      <div>
        <Intro description={description} />
        <Shop products={products} order={order} startPayment={startPayment} eventImg={eventImg} />
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
    startPayment: (userInfo, cart) => dispatch(startPayment(userInfo, cart)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Store);
