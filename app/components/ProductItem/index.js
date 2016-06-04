/**
*
* ProductItem
*
*/

import React from 'react';
import Radium from 'radium';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

import styles from './styles.css';

const sty = {
  select: {
    background: '#fff',
    width: '75%',
    // '@media (min-width: 768px)': {
    //     width: '50%',
    //     padding: '31px 15px',
    //     borderRadius: 35,
    //     textAlign: 'center',
    //   }
  },
  underline: {
    display: 'none'
  },
  label: {
    color: '#0D1332',
    // '@media (min-width: 720px)': {
    //   top: -24,
    //   paddingRight: 88,
    // }
  },
  icon: {
    fill: '#0D1332',
    // '@media (min-width: 720px)': {
    //   top: -18,
    //   width: 40,
    //   height: 40,
    // }
  },
  counter: {
    borderRadius: 0,
    minWidth: 25
  }
}

function ProductItem({description, featured_src, id, type, stock_quantity, price_html, short_description, title, variations, inc, dec, change, selected, counter}) {
  function createMarkup() { return {__html: price_html}; };
  return (
    <div className={ styles.wrapper }>
      <div className={ styles.id }>
        <img className={ styles.img } src={featured_src} />
        <h4 className={ styles.title }>{title}</h4>
      </div>
      <div className={ styles.info }>
        {
          type === 'variable' &&
            <SelectField
              value={ selected }
              onChange={ change }
              iconStyle={ sty.icon }
              labelStyle={ sty.label }
              underlineStyle={ sty.underline }
              style={ sty.select }>
              <MenuItem value={1} primaryText='República...' />
              {variations.map((item, key) => <MenuItem
                value={item.attributes[0].option}
                key={key}
                primaryText={item.attributes[0].option}>
                </MenuItem> )}
            </SelectField>
        }
        {
          type === 'simple' &&
          <div className={ styles.simple_container }>
            <div className={ styles.simple_product }>
              {stock_quantity} <span className={ styles.restantes}>restantes</span>
            </div>
          </div>
        }
        {
          selected !== 1 &&
          <div className={ styles.stock }>
            {
              variations
              .filter((item) => item.attributes[0].option === selected)
              .map((res, key) => <span key={key} className={ styles.stock_num}>{res.stock_quantity}</span>)
            }
            <span className={ styles.stock_text }>vagas</span>
          </div>
        }
        <div className={ styles.counter }>
          <span className={ styles.num }>{ counter }</span>
          <div className={ styles.buttons }>
            <FlatButton backgroundColor="#EC1D24" label='+' hoverColor="#fff" style={ sty.counter } onClick={inc} />
            <FlatButton backgroundColor="#FFCA05" label='-' hoverColor="#fff" style={ sty.counter } onClick={dec} />
          </div>
        </div>
      </div>
      <h3
      className={ styles.price }
      dangerouslySetInnerHTML={createMarkup()}/>
    </div>
  );
}
ProductItem = Radium(ProductItem);

export default ProductItem;
