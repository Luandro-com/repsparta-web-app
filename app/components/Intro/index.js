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

function Intro({description, headerImg, republicas}) {
  function createMarkup() { return {__html: description}; };
  let main, header;
  description !== null
    ? main = <div
      className={ styles.description }
      dangerouslySetInnerHTML={createMarkup()} />
    : main = <div className={ styles.description }><Loader /></div>
  headerImg
    ? header = headerImg
    : header = Colar
  return (
    <div className={ styles.wrapper }>
      <img className={ styles.colar } src={header} />
      <div className={ styles.republicas_wrapper}>
          {republicas.map((item, key) => {
            return <div key={key} className={ styles.republicas }>
              <a href="https://www.facebook.com/Hospedagem-SMAGA-1607335222890211/">
                <img src={item} />
              </a>
            </div>
          })}
      </div>
      <img className={ styles.title } src={Title} />
      { main }
      <img className={ styles.shields } src={Shields} />
    </div>
  );
}

export default Intro;
