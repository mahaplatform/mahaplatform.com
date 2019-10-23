import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import React from 'react'

const Results = () => {

  const list = {
    sections: [
      {
        title: 'Delivery',
        items: []
      }
    ]
  }

  return <List { ...list } />

}

Results.propTypes = {}

export default Results
