/**
*
* ProductItem
*
*/

import React from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import styles from './styles.css';

const sty = {
  select: {
    width: '35%',
    background: '#fff',
    padding: '31px 15px',
    textAlign: 'center',
    borderRadius: 35,
  },
  underline: {
    display: 'none'
  },
  label: {
    top: -24,
    color: '#0D1332',
    paddingRight: 88,
  },
  icon: {
    top: -18,
    width: 40,
    height: 40,
    fill: '#0D1332',
  }
}

function ProductItem({description, featured_src, id, type, stock_quantity, price_html, short_description, title, variations, inc, dec, change, selected, counter}) {
  function createMarkup() { return {__html: price_html}; };
  return (
    <div className={ styles.wrapper }>
      <div className={ styles.img }>
        <img src={featured_src} />
      </div>
      <h4 style={{width: '15%'}}>{title}</h4>
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
        <div style={{width: '35%'}}>
          <div className={ styles.simple_product }>
            {stock_quantity}
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
      <h3
      className={ styles.price }
      dangerouslySetInnerHTML={createMarkup()}/>
      <div className={ styles.counter }>
        <span className={ styles.num }>{ counter }</span>
        <div className={ styles.buttons }>
          <span className={ styles.plus } onClick={inc}>+</span>
          <span className={ styles.minus } onClick={dec}>-</span>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
