import Recipients from '../../../components/recipients'
import { Audit, Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import React from 'react'
import _ from 'lodash'

const Details = ({ audits, campaign }) => {

  const config = {}

  const design = {
    label: 'Design Workflow',
    className: 'link',
    route: `/admin/crm/campaigns/voice/${campaign.id}/design`
  }

  const recipients = pluralize('contact', campaign.recipients, true)

  const to = {
    label: recipients,
    className: 'link',
    modal: <Recipients campaign={ campaign } type="voice" />
  }

  if(campaign.status === 'draft') {
    config.alert = { color: 'grey', message: 'This campaign is in draft mode' }
  } else if(campaign.status === 'active') {
    config.alert = { color: 'green', message: 'This campaign is active' }
  } else if(campaign.status === 'inactive') {
    config.alert = { color: 'red', message: 'This campaign is inactive' }
  } else if(campaign.status === 'scheduled') {
    config.alert = { color: 'teal', message: 'This campaign is scheduled' }
  } else if(campaign.status === 'sent') {
    config.alert = { color: 'green', message: 'This campaign was sent' }
  }

  config.items = []

  if(campaign.direction === 'outbound') {
    config.items.push({ label: 'Title', content: campaign.title })
  }

  config.items.push({ label: 'Program', content: campaign.program.title })

  if(campaign.direction === 'outbound') {
    config.items.push({ label: 'Purpose', content: campaign.purpose })
  }

  config.items.push({ label: 'Phone Number', content: campaign.phone_number.formatted })

  if(campaign.direction === 'outbound') {
    config.items.push({ label: 'To', content: campaign.status === 'draft' ? <Button { ...to } /> : recipients })
  }

  if(_.includes(['draft','inactive'], campaign.status)) {
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
  audits: PropTypes.array,
  campaign: PropTypes.object
}

export default Details
