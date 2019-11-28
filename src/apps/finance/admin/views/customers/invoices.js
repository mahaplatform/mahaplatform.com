import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import moment from 'moment'
import React from 'react'

const Invoices = ({ invoices }) => {

  const button = (invoice) => ({
    className: 'link',
    label: invoice.code,
    route: `/admin/finance/invoices/${invoice.id}`
  })

  return (
    <table className="ui celled compact unstackable table">
      <thead>
        <tr>
          <th>Code</th>
          <th className="collapsing">Date</th>
          <th className="collapsing">Total</th>
        </tr>
      </thead>
      <tbody>
        { invoices.map((invoice, index) => (
          <tr key={`invoice_${index}`}>
            <td><Button { ...button(invoice) } /></td>
            <td>{ moment(invoice.date).format('MM/DD/YYYY') }</td>
            <td className="right aligned">{ numeral(invoice.total).format('0.00') }</td>
          </tr>
        )) }
      </tbody>
    </table>
  )

}

Invoices.propTypes = {
  invoices: PropTypes.array
}

export default Invoices
