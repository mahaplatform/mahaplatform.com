import { List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ account }) => {

  const list = {
    items: [
      { label: 'Name', content: account.full_name },
      { label: 'Email', content: account.email }
    ]
  }

  return <List { ...list } />

}

Details.propTypes = {
  account: PropTypes.object
}

export default Details
