/**
*
* CheckoutDialog
*
*/

import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
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

function CheckoutDialog({ close, handlePrev, handleNext, handleCCFocus, handleCCName, handleCCNumber, handleCCcvc, handleCCDate, postOrder, products, props }) {
  const { open, finished, stepIndex } = props;
  function renderStepActions(step) {
    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={props.stepIndex === 2 ? 'Finalizar' : 'Próximo'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={handleNext}
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
  })
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
                {renderStepActions(0)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Escolha método de pagamento</StepLabel>
              <StepContent>
                <RadioButtonGroup
                  name="Checkout"
                  defaultSelected="cc">
                    <RadioButton
                      value="cc"
                      label="Cartão de Crédito"
                      style={styles.radioButton}
                    />
                    <RadioButton
                      value="tb"
                      label="Transferência Bancária"
                      style={styles.radioButton}
                    />
                    <RadioButton
                      value="bb"
                      label="Boleto"
                      style={styles.radioButton}
                    />
                  </RadioButtonGroup>
                  {renderStepActions(1)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Dados do comprador</StepLabel>
              <StepContent>
                <Card
                  expiry={props.cc_date}
                  number={props.cc_number}
                  cvc={props.cc_cvc}
                  name={props.cc_name}
                  focused={props.cc_focus}/>
                    <TextField
                      style={sty.input}
                      name="name"
                      hintText="Nome"
                      floatingLabelText="Nome"
                      type="text"
                      onFocus={handleCCFocus}
                      onChange={handleCCName}
                      value={props.cc_name}
                    />
                    <TextField
                      style={sty.input}
                      name="number"
                      hintText="Número do cartão"
                      floatingLabelText="Número"
                      type="text"
                      onFocus={handleCCFocus}
                      onChange={handleCCNumber}
                      value={props.cc_number}
                    />
                    <TextField
                      style={sty.input}
                      name="expiry"
                      hintText="Data de expiração"
                      floatingLabelText="Data"
                      type="text"
                      onFocus={handleCCFocus}
                      onChange={handleCCDate}
                      value={props.cc_date}
                    />
                    <TextField
                      style={sty.input}
                      name="cvc"
                      hintText="Código de segurança"
                      floatingLabelText="Código"
                      type="text"
                      onFocus={handleCCFocus}
                      onChange={handleCCcvc}
                      value={props.cc_cvc}
                    />
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
