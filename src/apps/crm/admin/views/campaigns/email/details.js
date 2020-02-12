import { Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ campaign }) => {

  const config = {}

  const design = {
    label: 'Design Email',
    className: 'link',
    route: `/admin/crm/campaigns/email/${campaign.id}/design`
  }

  const workflow = {
    label: 'Design Workflow',
    className: 'link',
    route: `/admin/crm/campaigns/email/${campaign.id}/workflow`
  }

  config.items = [
    { label: 'Title', content: campaign.title },
    { label: 'Program', content: campaign.program.title },
    { label: 'To', content: campaign.to },
    { label: 'Status', content: campaign.status },
    { label: 'Content', content: <Button { ...design } /> },
    { label: 'Workflow', content: <Button { ...workflow } /> }
  ]

  return <List { ...config } />

}

Details.propTypes = {
  campaign: PropTypes.object
}

export default Details
