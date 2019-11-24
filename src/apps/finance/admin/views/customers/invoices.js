import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import React from 'react'

const Invoices = ({ invoices }) => {

  const list = {
    items: []
  }

  return <List { ...list } />

}

Invoices.propTypes = {
  invoices: PropTypes.array
}

export default Invoices
