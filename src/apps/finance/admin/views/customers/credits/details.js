import { Audit, Button, List, Comments } from '@admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

const Details = ({ audits, credit }) => {

  const customer = {
    className: 'link',
    label: credit.customer.display_name,
    route: `/admin/finance/customers/${credit.customer.id}`
  }

  const list = {
    items: [
      { label: 'Customer', content: <Button { ...customer } /> },
      { label: 'Program', content: credit.program.title },
      { label: 'Amount', content: numeral(credit.amount).format('0.00') },
      { label: 'Balance', content: numeral(credit.balance).format('0.00') },
      { component: <Audit entries={ audits } /> }
    ]
  }

  list.footer = <Comments entity={`finance_credits/${credit.id}`} />

  return <List { ...list } />

}

Details.propTypes = {
  audits: PropTypes.array,
  credit: PropTypes.object,
  payments: PropTypes.array
}

export default Details
