import { Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ campaign }) => {

  const config = {}

  const design = {
    label: 'Design Post',
    className: 'link',
    route: `/admin/crm/campaigns/social/${campaign.code}/design`
  }

  if(campaign.deleted_at !== null) {
    config.alert = { color: 'red', message: 'This campaign was deleted' }
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
