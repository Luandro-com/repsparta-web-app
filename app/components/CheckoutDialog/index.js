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
  inputMin: {
    width: '30%',
    margin: '0 1%'
  },
  input: {
    width: '45%',
    margin: '0 2%'
  },
  errorStyle: {
   color: '#EC1D24'
 },
}

function CheckoutDialog({
    close, handlePrev, handleNext, handleSubmit,
    handleCep, handleCpf, handleFirstName, handleLastName, handlePhone, handleNumber, handleEmail, handleStreet, handleNeighborhood,
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
              <StepLabel>Dados do comprador</StepLabel>
              <StepContent>
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

                {renderStepActions(0)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Endereço</StepLabel>
              <StepContent>
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
                  {renderStepActions(1)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Finalizar</StepLabel>
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
