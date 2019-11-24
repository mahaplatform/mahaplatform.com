import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import React from 'react'


const Details = ({ payment }) => {

  const list = {
    items: [
    ]
  }

  return <List { ...list } />

}

Details.propTypes = {
  payment: PropTypes.object
}

export default Details
