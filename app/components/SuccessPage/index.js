/**
*
* SuccessPage
*
*/

import React from 'react';

import styles from './styles.css';
import { postApi } from '../../utils/api'

class SuccessPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
  }
  componentDidMount() {
    postApi(176)
    .then((res) => {
      this.setState({
        content: res.content.rendered
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    const { content } = this.state;
    function createMarkup() { return {__html: content}; };
    return (
      <div className={ styles.wrapper }>
        <div className={ styles.container}>
          <div
          dangerouslySetInnerHTML={createMarkup()} />
          <br />
          <br />
          <br />
          <h3>Código do pedido: {this.props.params.payment}</h3>
          <h3>Código da transação do PagSeguro: {this.props.params.transaction}</h3>
        </div>
      </div>
    );
  }
}

export default SuccessPage;
