/**
*
* Footer
*
*/

import React from 'react';
import Loader from 'halogen/PulseLoader';

import styles from './styles.css';
import Divider from './divider2.svg';
import BotDivider from './footer.svg';
import Facebook from './facebook.png';

function Footer({footer}) {
  function createMarkup() { return {__html: footer};};
  let main;
  footer !== null
    ? main = <div
      className={styles.text}
      dangerouslySetInnerHTML={createMarkup()} />
    : main = <div className={styles.text}><Loader /></div>
  return (
    <div className={styles.wrapper}>
      <img className={styles.divider} src={Divider} />
      {main}
      <img className={styles.bot_divider} src={BotDivider} />
      <div className={styles.footer}>
        <div className={styles.footer_container}>
          <a href="https://www.facebook.com/Hospedagem-SMAGA-1607335222890211">
            <img className={styles.facebook} src={Facebook} />
          </a>
          <span>© 2017 República Sparta</span>
          <a href="http://luandro.com">
            <span>por Luandro</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
