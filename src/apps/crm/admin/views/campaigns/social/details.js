import { List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ campaign }) => {

  const config = {}

  config.items = [
    { label: 'Title', content: campaign.title },
    { label: 'Program', content: campaign.program.title }
  ]

  return <List { ...config } />

}

Details.propTypes = {
  campaign: PropTypes.object
}

export default Details
