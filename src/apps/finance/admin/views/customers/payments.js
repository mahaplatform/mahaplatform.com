import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import React from 'react'

const Payments = ({ payments }) => {

  const list = {
    items: []
  }

  return <List { ...list } />

}

Payments.propTypes = {
  payments: PropTypes.array
}

export default Payments
