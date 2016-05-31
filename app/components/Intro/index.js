/**
*
* Intro
*
*/

import React from 'react';
import Loader from 'halogen/PulseLoader';

import styles from './styles.css';
import Colar from './colar.png';
import Title from './TITULO.png'
import Shields from './escudos.png';

function Intro(description) {
  function createMarkup() { return {__html: description.description}; };
  let main;
  description.description !== null
    ? main = <div
      className={ styles.description }
      dangerouslySetInnerHTML={createMarkup()} />
    : main = <div className={ styles.description }><Loader /></div>
  return (
    <div className={ styles.wrapper }>
      <img className={ styles.colar } src={Colar} />
      <img className={ styles.title } src={Title} />
      { main }
      <img className={ styles.shields } src={Shields} />
    </div>
  );
}

export default Intro;
