import { Button, List } from 'maha-admin'
import Recipients from './recipients'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import React from 'react'

const Details = ({ campaign }) => {

  const config = {}

  const design = {
    label: 'Design Email',
    className: 'link',
    route: `/admin/crm/campaigns/email/${campaign.id}/design`
  }

  const to = {
    label: pluralize('contact', campaign.recipients, true),
    className: 'link',
    modal: <Recipients campaign={ campaign } />
  }

  config.items = [
    { label: 'Title', content: campaign.title },
    { label: 'Program', content: campaign.program.title },
    { label: 'Purpose', content: campaign.purpose },
    { label: 'To', content: <Button { ...to } /> },
    { label: 'Status', content: campaign.status },
    { label: 'Send At', content: campaign.send_at },
    { label: 'Content', content: <Button { ...design } /> }
  ]

  return <List { ...config } />

}

Details.propTypes = {
  campaign: PropTypes.object
}

export default Details
