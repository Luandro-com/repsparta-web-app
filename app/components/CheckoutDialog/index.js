/**
*
* CheckoutDialog
*
*/

import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import Card from 'react-credit-card';
require('react-credit-card/source/card.css');
require('react-credit-card/source/card-types.css')
import styles from './styles.css';

const sty={
  input: {
    width: '45%',
    margin: '0 2%'
  }
}

function CheckoutDialog({
    close, handlePrev, handleNext, handleSubmit,
    handleCep, handleCpf, handleFirstName, handleLastName, handlePhone, handleNumber, handleEmail, handleStreet,
    products, props
  }) {
  const {
    open, finished, stepIndex,
    first_name, last_name, email, phone, number, cpf, cep, street
  } = props;
  function renderStepActions(step) {
    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={props.stepIndex === 2 ? 'Finalizar' : 'Próximo'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={props.stepIndex === 2 ? handleSubmit : handleNext}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="Voltar"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={handlePrev}
          />
        )}
      </div>
    );
  }
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
          <Stepper activeStep={props.stepIndex} orientation="vertical">
            <Step>
              <StepLabel>Confirme lista de compras</StepLabel>
              <StepContent>
                <TextField
                  style={ sty.input }
                  hintText="José"
                  floatingLabelText="Primeiro nome"
                  type="text"
                  onChange={handleFirstName}
                  value={props.first_name}
                />
                <TextField
                  style={ sty.input }
                  hintText="Rodriguez"
                  floatingLabelText="Sobrenome"
                  type="text"
                  onChange={handleLastName}
                  value={props.last_name}
                />
                <TextField
                  style={ sty.input }
                  hintText="jose_rod@repsparta.com"
                  floatingLabelText="E-mail"
                  type="text"
                  onChange={handleEmail}
                  value={props.email}
                />
                <TextField
                  style={ sty.input }
                  hintText="123.456.789-10"
                  floatingLabelText="CPF"
                  type="text"
                  onChange={handleCpf}
                  value={props.cpf}
                />

                {renderStepActions(0)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Dados para contato</StepLabel>
              <StepContent>
                  <TextField
                    style={ sty.input }
                    hintText="36570-000"
                    floatingLabelText="CEP"
                    type="text"
                    onChange={handleCep}
                    value={props.cep}
                  />
                  <TextField
                    style={ sty.input }
                    hintText="(31) 99787-2928"
                    floatingLabelText="Telefone"
                    type="text"
                    onChange={handlePhone}
                    value={props.phone}
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
                    floatingLabelText="number"
                    type="text"
                    onChange={handleNumber}
                    value={props.number}
                  />
                  {renderStepActions(1)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Dados do comprador</StepLabel>
              <StepContent>
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
                {renderStepActions(2)}
              </StepContent>
            </Step>
          </Stepper>
          {props.finished && (
            <p style={{margin: '20px 0', textAlign: 'center'}}>
            </p>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export default CheckoutDialog;
