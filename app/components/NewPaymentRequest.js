import React from 'react'
import styled from 'styled-components'
import {
  Button,
  DropDown,
  IconCross,
  Info,
  Field,
  Text,
  TextInput,
  theme,
} from '@aragon/ui'
import InvoicingApp from '../InvoicingApp';

const addressPattern = '(0x)?[0-9a-fA-F]{40}';
const initialState = {
  selectedToken: 0,
  payer: {
    error: null,
    value: '',
  },
  amount: '',
}

export default class NewPaymentRequest extends React.Component {
  // static defaultProps = {
  //   onNewPaymentRequest: () => {console.log('a no-op onNewPaymentRequest')},
  // }
  state = {
    ...initialState,
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log('create a new payment requ!', this.state.amount)
    InvoicingApp.createRequestAsPayee(this.state.amount, this.state.payer.value);
  }

  handlePayerUpdate = event => {
    this.setState({
      payer: {
        error: null,
        value: event.target.value,
      },
    })
  }

  handleAmountUpdate = event => {
    this.setState({ amount: event.target.value })
  }

  handleSelectToken = index => {
    this.setState({ selectedToken: index })
  }

  render() {
    const { tokens } = this.props;
    const { amount, payer, selectedToken } = this.state;
    const symbols = tokens.map(({ symbol }) => symbol);
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        {/* <h1>{title}</h1> */}
        <Field label="Payer (must be a valid Ethereum address)">
          <TextInput
            // innerRef={payer => (this.payerInput = payer)}
            onChange={this.handlePayerUpdate}
            pattern={
              // Allow spaces to be trimmable
              ` *${addressPattern} *`
            }
            value={payer.value}
            required
            wide
          />
        </Field>
        <AmountField>
          <label>
            <Text.Block color={theme.textSecondary} smallcaps>
              Amount
            </Text.Block>
          </label>
          <CombinedInput>
            <TextInput.Number
              value={amount}
              onChange={this.handleAmountUpdate}
              min={0}
              step="any"
              required
              wide
            />
            <DropDown
              items={symbols}
              active={selectedToken}
              onChange={this.handleSelectToken}
            />
          </CombinedInput>
        </AmountField>
        {/* <Field label="Invoice">
          <TextInput
            onChange={this.handleReferenceUpdate}
            value={reference}
            wide
          />
        </Field> */}
        <ButtonWrapper>
          <Button mode="strong" type="submit" wide>
            Submit Payment Request
          </Button>
        </ButtonWrapper>
        {payer.error && (
          <ValidationError message="Payer must be a valid Ethereum address" />
        )}
      </form>
    )
  }
}

const AmountField = styled.div`
  margin-bottom: 20px;
`

const CombinedInput = styled.div`
  display: flex;
  input[type='text'] {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: 0;
  }
  input[type='text'] + div > div:first-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`

const ButtonWrapper = styled.div`
  padding-top: 10px;
`

const ValidationError = ({ message }) => (
  <ValidationErrorBlock>
    <IconCross />
    <Text size="small" style={{ marginLeft: '10px' }}>
      Recipient must be a valid Ethereum address
    </Text>
  </ValidationErrorBlock>
)

const ValidationErrorBlock = styled.p`
  margin-top: 15px;
`