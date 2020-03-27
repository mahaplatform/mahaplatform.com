import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import React from 'react'

const Details = ({ session }) => {

  const config = {
    items: [
      { label: 'Title', content: session.title }
    ]
  }

  return <List { ...config } />

}

Details.propTypes = {
  session: PropTypes.object
}

export default Details
