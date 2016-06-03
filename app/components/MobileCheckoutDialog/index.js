/**
*
* MobileCheckoutDialog
*
*/

import React from 'react';
import Radium from 'radium';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Loader from 'halogen/GridLoader';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import styles from './styles.css';

const sty={
  inputMin: {
    width: '100%',
  },
  input: {
    width: '100%',
  },
  errorStyle: {
   color: '#EC1D24'
 },
}

function MobileCheckoutDialog({
    close, handlePrev, handleNext, handleSubmit,
    handleCep, handleCpf, handleFirstName, handleLastName, handlePhone, handleNumber, handleEmail, handleStreet, handleNeighborhood,
    products, order, props
  }) {
  const {
    open, finished, stepIndex,
    first_name, last_name, email, phone, number, cpf, cep, street
  } = props;

  const actions = [
      <FlatButton
        label="Cancelar"
        primary={true}
        onTouchTap={close}
      />,
    ];
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
  let finishButton;
  order.loading
    ? finishButton = <div style={{paddingTop: 15}}><Loader color={'#EC1D24'} /></div>
    : finishButton = <FlatButton label="Cancelar" primary={true} onTouchTap={handleSubmit} />
  return (
    <div className={ styles.wrapper }>
      <Dialog
        title="Finalizar Compra"
        className={ styles.overlay }
        autoScrollBodyContent={true}
        actions={actions}
        modal={false}
        open={props.open}
        onRequestClose={close}>
        <div style={{margin: 'auto'}}>
          <TextField
            style={ sty.inputMin }
            hintText="José"
            floatingLabelText="Primeiro nome"
            type="text"
            onChange={handleFirstName}
            onBlur={handleFirstName}
            errorText={props.first_name_error ? 'Este campo é obrigatório' : ''}
            errorStyle={sty.errorStyle}
            value={props.first_name}
          />
          <TextField
            style={ sty.inputMin }
            hintText="Rodriguez"
            floatingLabelText="Sobrenome"
            type="text"
            onChange={handleLastName}
            value={props.last_name}
            onBlur={handleLastName}
            errorText={props.last_name_error ? 'Este campo é obrigatório' : ''}
            errorStyle={sty.errorStyle}
          />
          <TextField
            style={ sty.inputMin }
            hintText="jose_rod@repsparta.com"
            floatingLabelText="E-mail"
            type="email"
            onChange={handleEmail}
            value={props.email}
            onBlur={handleEmail}
            errorText={props.email_error ? 'Digite um email válido' : ''}
            errorStyle={sty.errorStyle}
          />
          <TextField
            style={ sty.input }
            hintText="123.456.789-10"
            floatingLabelText="CPF"
            type="text"
            onChange={handleCpf}
            value={props.cpf}
            onBlur={handleCpf}
            errorText={props.cpf_error ? 'Digite um CPF válido' : ''}
            errorStyle={sty.errorStyle}
          />
          <TextField
            style={ sty.input }
            hintText="(31) 99787-2928"
            floatingLabelText="Telefone"
            type="tel"
            onChange={handlePhone}
            value={props.phone}
            onBlur={handlePhone}
            errorText={props.phone_error ? 'Digite um telefone válido' : ''}
            errorStyle={sty.errorStyle}
          />
          <TextField
            style={ sty.input }
            hintText="36570-000"
            floatingLabelText="CEP"
            type="text"
            onChange={handleCep}
            value={props.cep}
            onBlur={handleCep}
            errorText={props.cep_error ? 'Digite um CEP válido' : ''}
            errorStyle={sty.errorStyle}
          />
          <TextField
            style={ sty.input }
            hintText="Bairro das Araras"
            floatingLabelText="Bairro"
            type="text"
            onChange={handleNeighborhood}
            value={props.neighborhood}
          />

          <TextField
            style={ sty.input }
            hintText="Rua dos Eucaliptos"
            floatingLabelText="Rua"
            type="text"
            onChange={handleStreet}
            value={props.street}
          />
          <TextField
            style={ sty.input }
            hintText="13"
            floatingLabelText="Número"
            type="text"
            onChange={handleNumber}
            value={props.number}
          />
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
          { finishButton }
        </div>
      </Dialog>
    </div>
  );
}
MobileCheckoutDialog = Radium(MobileCheckoutDialog);
export default MobileCheckoutDialog;
