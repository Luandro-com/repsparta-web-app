/**
*
* Footer
*
*/

import React from 'react';

import styles from './styles.css';
import Divider from './divider2.png';
import BotDivider from './footer.png';
import Facebook from './facebook.png';

function Footer({footer}) {
  return (
    <div className={ styles.wrapper }>
      <img className={ styles.divider } src={Divider} />
      <p className={ styles.text }>{ footer }</p>
      <img className={ styles.bot_divider } src={BotDivider} />
      <div className={ styles.footer }>
        <div className={ styles.footer_container }>
          <a href="http://facebook.com">
            <img className={ styles.facebook } src={Facebook} />
          </a>
          <span>© 2016 República Sparta</span>
          <span>por Luandro</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
