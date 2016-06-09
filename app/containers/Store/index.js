/*
 *
 * Store
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { push } from 'react-router-redux'
import { selectProducts, selectOrder, selectContent } from './selectors';
import { fetchProducts, fetchContent, startPayment, failPayment, completeOrder } from './actions';

import Intro from 'components/Intro';
import Shop from 'components/Shop';
import Footer from 'components/Footer';

export class Store extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { fetchProducts, fetchContent } = this.props;
    fetchContent();
    fetchProducts();
  }
  componentDidUpdate() {
    const { failPayment, changeRoute, completeOrder } = this.props;
    const { lightboxLoaded, lightboxOpen, paymentCode, orderId } = this.props.order;
    if(lightboxLoaded && lightboxOpen) {
      PagSeguroLightbox({
        code: paymentCode
      }, {
          success : (transactionCode) => {
          completeOrder({ orderId, paymentCode, transactionCode });
          // changeRoute(`/success/${paymentCode}/${transactionCode}`);
        },
          abort : () => {
          failPayment({ok: false, err: 'Abort'});
        }
      });
    }
  }

  render() {
    const { products, order, startPayment, content } = this.props;
    return (
      <div>
        <Intro description={content.description} headerImg={content.headerImg} republicas={content.republicas} />
        <Shop products={products} order={order} startPayment={startPayment} eventImg={content.eventImg} />
        <Footer footer={content.footer} />
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  selectProducts(),
  selectOrder(),
  selectContent(),
  (products, order, content) => ({ products, order, content })
);

function mapDispatchToProps(dispatch) {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    fetchContent: () => dispatch(fetchContent()),
    startPayment: (userInfo, cart) => dispatch(startPayment(userInfo, cart)),
    failPayment: (err) => dispatch(failPayment(err)),
    changeRoute: (route) => dispatch(push(route)),
    completeOrder: (data) => dispatch(completeOrder(data)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Store);
