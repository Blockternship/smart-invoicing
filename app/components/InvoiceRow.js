import React from 'react'
import styled from 'styled-components'

import {
  TableRow,
  TableCell,
} from '@aragon/ui'

export default class InvoiceRow extends React.Component {
  getPaymentStatus(status) {
    switch(status) {
      case '0':
        return 'Pending'
      case '1':
        return 'Accepted'
      case '2':
      return 'Canceled'
    }
  }

  render() {
    return (
      <TableRow>
        <NoWrapCell>{this.props.id}</NoWrapCell>
        <NoWrapCell>{this.props.payer}</NoWrapCell>
        <NoWrapCell>{this.getPaymentStatus(this.props.status)}</NoWrapCell>
        <NoWrapCell>{web3.fromWei(this.props.amount, 'ether') + ' ETH'}</NoWrapCell>
      </TableRow>
    )
  }
}

const NoWrapCell = styled(TableCell)`
  white-space: nowrap;
`