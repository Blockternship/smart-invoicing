import React from 'react'
import {
  AragonApp,
  Button,
  AppBar,
  observe,
  SidePanel
} from '@aragon/ui'
import Invoices from './components/Invoices';
import NewPaymentRequest from './components/NewPaymentRequest';
import { Observable } from 'rxjs'

// const AppContainer = styled(AragonApp)`
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newPaymentRequestOpened: false
    }
  }

  handleNewPaymentRequestOpen = () => {
    this.setState({ newPaymentRequestOpened: true })
  }

  handleNewPaymentRequestClose = () => {
    this.setState({ newPaymentRequestOpened: false })
  }

  render () {
    return (
      <AragonApp className="app" publicUrl={'/'}>
        <AppBar
          title="Invoices"
          endContent={
            <Button mode="strong" onClick={this.handleNewPaymentRequestOpen}>
              Create Payment Request
            </Button>
          }
        />
        <ObservedPayments observable={this.props.observable} />
        {/* 0x8401Eb5ff34cc943f096A32EF3d5113FEbE8D4Eb */}
        {/* <ObservedPayments observable={Observable.from([[{id: '1', payer: 'payer'}]])} /> */}
        <SidePanel
          title="New Payment Request"
          opened={this.state.newPaymentRequestOpened}
          onClose={this.handleNewPaymentRequestClose}>
            <NewPaymentRequest app={this.props.app} tokens={[{symbol: 'ETH'}]}/>
        </SidePanel>
      </AragonApp>
    )
  }
}

const ObservedPayments = observe(
  (state$) => state$,
  {rows: []}
)(Invoices)
