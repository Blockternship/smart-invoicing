import React from 'react'
import styled from 'styled-components'

import {
  TableRow,
  TableCell,
  ContextMenu,
  ContextMenuItem,
  SafeLink,
  formatHtmlDatetime,
  theme,
} from '@aragon/ui'

export default class InvoiceRow extends React.Component {
  render() {
    return (
      <TableRow>
        <NoWrapCell>{this.props.id}</NoWrapCell>
        <NoWrapCell>{this.props.payer}</NoWrapCell>
        <NoWrapCell>{this.props.status}</NoWrapCell>
        <NoWrapCell>{this.props.amount}</NoWrapCell>
      </TableRow>
    )
  }
}

const NoWrapCell = styled(TableCell)`
  white-space: nowrap;
`