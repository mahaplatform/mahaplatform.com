import ContactToken from '@apps/crm/admin/tokens/contact'
import PropTypes from 'prop-types'
import React from 'react'

const OrderToken = (order) => {
  const { first_name, last_name } = order.data
  const contact = {
    id: order.id,
    display_name: `${first_name} ${last_name}`,
    initials: `${first_name[0]}${last_name[0]}`
  }
  return <ContactToken { ...contact } />
}

OrderToken.propTypes = {
  order: PropTypes.object
}

export default OrderToken
