import Recipients from '../../../components/recipients'
import { Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import React from 'react'

const Details = ({ campaign }) => {

  const config = {}

  const design = {
    label: 'Design Workflow',
    className: 'link',
    route: `/admin/crm/campaigns/voice/${campaign.id}/design`
  }

  const to = {
    label: pluralize('contact', campaign.recipients, true),
    className: 'link',
    modal: <Recipients campaign={ campaign } type="voice" />
  }

  config.items = [
    { label: 'Title', content: campaign.title },
    { label: 'Program', content: campaign.program.title },
    { label: 'Purpose', content: campaign.purpose },
    { label: 'Phone Number', content: campaign.phone_number.formatted },
    { label: 'To', content: <Button { ...to } /> },
    { label: 'Content', content: <Button { ...design } /> }
  ]

  return <List { ...config } />

}

Details.propTypes = {
  campaign: PropTypes.object
}

export default Details
