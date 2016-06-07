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
        {this.props.params.id}
      </div>
    );
  }
}

export default SuccessPage;
