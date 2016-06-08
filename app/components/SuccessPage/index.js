/**
*
* SuccessPage
*
*/

import React from 'react';

import styles from './styles.css';

class SuccessPage extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <div className={ styles.successPage }>
        {this.props.params.payment}
        {this.props.params.transaction}
      </div>
    );
  }
}

export default SuccessPage;
