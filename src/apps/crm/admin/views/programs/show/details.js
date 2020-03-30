import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import React from 'react'

const Details = ({ program }) => {

  const list = {}

  list.items = [
    { label: 'Title', content: program.title },
    { label: 'Phone Number', content: program.phone_number ? program.phone_number.formatted : 'NONE' },
    { label: 'Invoice Address', content: <span dangerouslySetInnerHTML={{ __html: program.address.replace(/\n/g,'<br />') }} /> },
    { label: 'Merchant Account', content: program.merchant ? program.merchant.title : 'NONE' }
  ]

  return <List { ...list } />

}

Details.propTypes = {
  program: PropTypes.object
}

export default Details
