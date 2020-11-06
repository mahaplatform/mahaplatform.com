import PropTypes from 'prop-types'
import { List } from '@admin'
import React from 'react'

const Refunds = ({ refunds }) => {

  const list = {
    items: []
  }

  return <List { ...list } />

}

Refunds.propTypes = {
  refunds: PropTypes.array
}

export default Refunds
