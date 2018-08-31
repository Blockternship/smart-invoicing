import React from 'react'
import InvoiceRow from './InvoiceRow';

import {
  Button,
  Table,
  TableHeader,
  TableRow,
  DropDown,
  theme,
} from '@aragon/ui'

export default class Invoices extends React.Component {
  render() {
    const tableRows = [];
    const _state = [{
      id: '123',
      payer: '0xb8d851486d1c953e31a44374aca11151d49b8bb3',
      status: 'Pending',
      amount: '0.45 ETH'}]
      _state.forEach(row => {
        tableRows.push(
          <InvoiceRow {...row} key={row.id} />
        )
      })
    return (
      <div>
        <Table
          header={
            <TableRow>
              {/* <TableHeader title="Date" /> */}
              <TableHeader title="id" />
              <TableHeader title="Payer" />
              <TableHeader title="Status" />
              <TableHeader title="Amount" />
            </TableRow>
          }
        >
          {tableRows}
        </Table>
      </div>
    )
  }
}