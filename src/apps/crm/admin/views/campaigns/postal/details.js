import { Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ campaign }) => {

  const config = {}

  const design = {
    label: 'Design Document',
    className: 'link',
    route: `/admin/crm/campaigns/postal/${campaign.code}/design`
  }

  config.items = [
    { label: 'Title', content: campaign.title },
    { label: 'Program', content: campaign.program.title },
    { label: 'Content', content: <Button { ...design } /> }
  ]

  return <List { ...config } />

}

Details.propTypes = {
  campaign: PropTypes.object
}

export default Details
