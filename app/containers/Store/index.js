/*
 *
 * Store
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectProducts, selectDescription, selectEventImg, selectFooter } from './selectors';
import { fetchProducts, fetchDescription, fetchFooter, postOrder } from './actions';

import Intro from 'components/Intro';
import Shop from 'components/Shop';
import Footer from 'components/Footer';

export class Store extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { fetchProducts, fetchDescription } = this.props;
    fetchProducts();
    fetchDescription();
    fetchFooter();
  }

  render() {
    const { products, description, postOrder, eventImg, footer } = this.props;
    return (
      <div>
        <Intro description={description} />
        <Shop products={products} postOrder={postOrder} eventImg={eventImg} />
        <Footer footer={footer} />
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  selectProducts(),
  selectDescription(),
  selectEventImg(),
  selectFooter(),
  (products, description, eventImg, footer) => ({ products, description, eventImg, footer })
);

function mapDispatchToProps(dispatch) {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    fetchDescription: () => dispatch(fetchDescription()),
    fetchFooter: () => dispatch(fetchFooter()),
    postOrder: (info) => dispatch(postOrder(info)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Store);
