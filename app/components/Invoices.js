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
    console.log('Invoices props', this.props);
    this.props.rows.forEach(row => {
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