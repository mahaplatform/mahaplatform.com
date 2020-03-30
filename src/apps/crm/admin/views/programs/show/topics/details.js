import { Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ topic }) => {

  const config = {}

  config.items = [
    { label: 'Title', content: topic.title },
    { label: 'Program', content: topic.program.title }
  ]

  return <List { ...config } />

}

Details.propTypes = {
  topic: PropTypes.object
}

export default Details
