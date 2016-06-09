/**
*
* PaymentPage
*
*/

import React from 'react';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import styles from './styles.css';

const sty={
  modal: {
  },
  inputMin: {
    width: '100%',
  },
  input: {
    width: '100%',
  },
  errorStyle: {
   color: '#EC1D24'
 },
 fail: {
   margin: '30px auto',
   width: '85%',
   textAlign: 'center',
   border: '1px solid #EC1D24',
   padding: 10,
 }
}

const numPeople = 4;

function PaymentPage({products, total, numItems}) {
  let formFields = []
  for (var i = 0; i < numPeople; i++) {
    formFields.push([
      <h2>Pessoa {i+1}</h2>,
      <TextField
        style={ sty.inputMin }
        hintText="Maria Juana"
        floatingLabelText="Nome"
        type="text"
        // onChange={handleEmail}
        // value={props.email}
        // onBlur={handleEmail}
        // errorText={props.email_error ? 'Digite um email válido' : ''}
        // errorStyle={sty.errorStyle}
      />,
      <TextField
        style={ sty.inputMin }
        hintText="12093810923"
        floatingLabelText="RG"
        type="text"
        // onChange={handleEmail}
        // value={props.email}
        // onBlur={handleEmail}
        // errorText={props.email_error ? 'Digite um email válido' : ''}
        // errorStyle={sty.errorStyle}
      />
    ])
  }
  let cart = [];
  products.map((item, key) => {
    if(props[`counter${item.id}`]) {
      cart.push(
        <TableRow key={key}>
          <TableRowColumn style={{width: '70%'}}>{item.title}</TableRowColumn>
          <TableRowColumn style={{width: '10%'}}>{props[`counter${item.id}`]}</TableRowColumn>
          <TableRowColumn style={{width: '20%'}}>R${item.price}</TableRowColumn>
        </TableRow>
      )
    }
  });
  return (
    <div className={ styles.wrapper }>
      <div className={ styles.nav }>
        <FlatButton
          label="Voltar a loja"
          primary={true}
          // onTouchTap={close}
        />
      </div>
      <div className={ styles.container }>
        <h1>Dados do comprador</h1>

        <TextField
          style={ sty.inputMin }
          hintText="José da Silva"
          floatingLabelText="Nome completo"
          type="text"
          // onChange={handleName}
          // onBlur={handleName}
          // errorText={props.full_name_error ? 'Este campo é obrigatório' : ''}
          // errorStyle={sty.errorStyle}
          // value={props.full_name}
        />
        <TextField
          style={ sty.inputMin }
          hintText="jose_rod@repsparta.com"
          floatingLabelText="E-mail"
          type="email"
          // onChange={handleEmail}
          // value={props.email}
          // onBlur={handleEmail}
          // errorText={props.email_error ? 'Digite um email válido' : ''}
          // errorStyle={sty.errorStyle}
        />
        <h1 className={ styles.header }>Dados dos hospedeiros</h1>
        { formFields }
        <div className={ styles.finish }>
          <Table selectable={false}>
            <TableBody displayRowCheckbox={false}>
              { cart }
              {props.total > 0 &&
                <TableRow style={{background: '#000', color: '#fff'}}>
                  <TableRowColumn>TOTAL</TableRowColumn>
                  <TableRowColumn></TableRowColumn>
                  <TableRowColumn>R${props.total}</TableRowColumn>
                </TableRow>
              }
            </TableBody>
          </Table>
          <FlatButton label="Finalizar" primary={true} />
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
