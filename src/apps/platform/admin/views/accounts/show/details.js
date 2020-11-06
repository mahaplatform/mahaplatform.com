import { List } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ account }) => {

  const list = {
    items: [
      { label: 'Name', content: account.full_name },
      { label: 'Email', content: account.email },
      { label: 'Cell Phone', content: account.cell_phone }
    ]
  }

  if(account.is_blocked) {
    list.alert = { color: 'red', message: 'This account has been blocked' }
  }

  return <List { ...list } />

}

Details.propTypes = {
  account: PropTypes.object
}

export default Details
