import EmailPreview from '@apps/automation/admin/components/email_preview'
import { Audit, Comments, Button, List } from '@admin'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import React from 'react'

const Details = ({ audits, campaign }) => {

  const config = {}

  const design = {
    label: 'Design Email',
    className: 'link',
    route: `/admin/campaigns/email/${campaign.id}/design`
  }

  config.header = <EmailPreview email={ campaign } link={`/admin/emails/campaign/${campaign.code}/preview`} />

  if(campaign.deleted_at !== null) {
    config.alert = { color: 'red', message: 'This campaign was deleted' }
  } else if(campaign.status === 'draft') {
    config.alert = { color: 'grey', message: 'This campaign is in draft mode' }
  } else if(campaign.status === 'scheduled') {
    config.alert = { color: 'teal', message: 'This campaign is scheduled' }
  } else if(campaign.status === 'sent') {
    config.alert = { color: 'green', message: 'This campaign was sent' }
  }

  config.items = [
    { label: 'Title', content: campaign.title },
    { label: 'Program', content: campaign.program.title },
    { label: 'Purpose', content: campaign.purpose },
    { label: 'To', content: pluralize('contact', campaign.recipients, true) }
  ]

  config.items.push({ label: 'Content', content: <Button { ...design } /> })

  if(campaign.status === 'scheduled') {
    config.items.push({ label: 'Send At', content: campaign.send_at, format: 'datetime' })
  }

  if(campaign.status === 'sent') {
    config.items.push({ label: 'Sent At', content: campaign.sent_at, format: 'datetime' })
  }

  config.items.push({ component: <Audit entries={ audits } /> })

  config.footer = <Comments entity={`crm_email_campaigns/${campaign.id}`} />

  return <List { ...config } />

}

Details.propTypes = {
  audits: PropTypes.array,
  campaign: PropTypes.object
}

export default Details
