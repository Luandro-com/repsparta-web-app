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

function Footer() {
  return (
    <div className={ styles.wrapper }>
      <img className={ styles.divider } src={Divider} />
      <p className={ styles.text }>Cras quis nulla commodo, aliquam lectus sed, blandit augue. Cras ullamcorper bibendum bibendum. Duis tincidunt urna non pretium porta. Nam condimentum vitae ligula vel ornare. Phasellus at semper turpis. Nunc eu tellus tortor. Etiam at condimentum nisl, vitae sagittis orci. Donec id dignissim nunc.</p>
      <img className={ styles.bot_divider } src={BotDivider} />
      <div className={ styles.footer }>
        <div className={ styles.footer_container }>
          <a href="http://facebook.com">
            <img className={ styles.facebook } src={Facebook} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
