/**
*
* Intro
*
*/

import React from 'react';
import Loader from 'halogen/PulseLoader';

import styles from './styles.css';
import Colar from './colar.png';
import Title from './TITULO.png';
// import Shields from './escudos.png';

const Intro = ({ description, logoImg, republicas }) => {
  function createMarkup() { return { __html: description }; }
  let main;
  let header;
  description !== null
    ? main = (
      <div
        className={styles.description}
        dangerouslySetInnerHTML={createMarkup()}
      />
    )
    : main = (
      <div className={styles.description}>
        <Loader />
      </div>
    );
  logoImg ? header = logoImg : header = Colar;
  return (
    <div className={styles.wrapper}>
      <img className={styles.colar} src={header} alt="" />
      <div className={styles.republicas_wrapper}>
          {republicas.map((item, key) => (
            <div key={key} className={styles.republicas}>
              <img alt="" src={item} />
            </div>
            )
          )}
      </div>
      <img className={styles.title} alt="" src={Title} />
      {main}
      {/* <img className={styles.shields} alt="" src={Shields} /> */}
    </div>
  );
};

Intro.Proptypes = {
  description: React.PropTypes.string.isRequired,
  republicas: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};

export default Intro;
