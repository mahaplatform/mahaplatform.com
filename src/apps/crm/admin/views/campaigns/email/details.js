import Recipients from '../../../components/recipients'
import { Audit, Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import React from 'react'

const Details = ({ audits, campaign }) => {

  const config = {}

  const design = {
    label: 'Design Email',
    className: 'link',
    route: `/admin/crm/campaigns/email/${campaign.id}/design`
  }

  const to = {
    label: pluralize('contact', campaign.recipients, true),
    className: 'link',
    modal: <Recipients campaign={ campaign } type="email" />
  }

  config.items = [
    { label: 'Title', content: campaign.title },
    { label: 'Program', content: campaign.program.title },
    { label: 'Purpose', content: campaign.purpose },
    { label: 'To', content: <Button { ...to } /> },
    { label: 'Status', content: campaign.status }
  ]

  if(campaign.status === 'draft') {
    config.items.push({ label: 'Content', content: <Button { ...design } /> })
  }

  if(campaign.status === 'scheduled') {
    config.items.push({ label: 'Send At', content: campaign.send_at, format: 'datetime' })
  }

  if(campaign.status === 'sent') {
    config.items.push({ label: 'Sent At', content: campaign.sent_at, format: 'datetime' })
  }

  config.items.push({ component: <Audit entries={ audits } /> })

  return <List { ...config } />

}

Details.propTypes = {
  audits: PropTypes.object,
  campaign: PropTypes.object
}

export default Details
