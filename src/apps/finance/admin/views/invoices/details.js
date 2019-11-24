import Invoice from '../../components/invoice'
import PropTypes from 'prop-types'
import { Audit, Comments, List } from 'maha-admin'
import React from 'react'


const Details = ({ audits, invoice }) => {

  const list = {
    items: [
      { component: <Invoice invoice={ invoice } /> },
      { component: <Audit entries={ audits } /> },
      { component: <Comments entity={`finance_invoices/${invoice.id}`} /> }
    ]
  }

  return <List { ...list } />

}

Details.propTypes = {
  audits: PropTypes.array,
  invoice: PropTypes.object
}

export default Details
