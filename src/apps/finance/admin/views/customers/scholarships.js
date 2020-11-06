import PropTypes from 'prop-types'
import { List } from '@admin'
import React from 'react'

const Scholarships = ({ scholarships }) => {

  const list = {
    items: []
  }

  return <List { ...list } />

}

Scholarships.propTypes = {
  scholarships: PropTypes.array
}

export default Scholarships
