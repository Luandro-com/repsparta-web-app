/*
 *
 * Store
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectProducts, selectDescription } from './selectors';
import { fetchProducts, fetchDescription, postOrder } from './actions';

import Intro from 'components/Intro';
import Shop from 'components/Shop';
import Footer from 'components/Footer';

export class Store extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { fetchProducts, fetchDescription } = this.props;
    fetchProducts();
    fetchDescription();
  }

  render() {
    const { products, description, postOrder } = this.props;
    return (
      <div>
        <Intro description={description} />
        <Shop products={products} postOrder={postOrder} />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  selectProducts(),
  selectDescription(),
  (products, description) => ({ products, description })
);

function mapDispatchToProps(dispatch) {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    fetchDescription: () => dispatch(fetchDescription()),
    postOrder: (info) => dispatch(postOrder(info)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Store);
