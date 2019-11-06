import { Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ campaign }) => {

  const design = {
    label: 'Design Workflow',
    className: 'link',
    route: `/admin/crm/campaigns/voice/${campaign.code}/design`
  }

  const list = {}

  if(campaign.status === 'draft') {
    list.alert = { color: 'grey', message: 'This campaign is in draft mode' }
  } else if(campaign.status === 'active') {
    list.alert = { color: 'green', message: 'This campaign is active' }
  } else if(campaign.status === 'inactive') {
    list.alert = { color: 'red', message: 'This campaign is inactive' }
  }

  list.items = [
    { label: 'Title', content: campaign.title },
    { label: 'Program', content: campaign.program.title },
    { label: 'Phone Number', content: campaign.phone_number.formatted },
    { label: 'Content', content: <Button { ...design } /> }
  ]

  return <List { ...list } />

}

Details.propTypes = {
  campaign: PropTypes.object
}

export default Details
