import { Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ campaign }) => {

  const config = {}

  const design = {
    label: 'design email',
    className: 'link',
    route: `/admin/crm/campaigns/email/${campaign.code}/design`
  }

  config.items = [
    { label: 'Title', content: campaign.title },
    { label: 'Program', content: campaign.program.title },
    { label: 'From', content: campaign.sender.rfc822 },
    { label: 'To', content: campaign.to },
    { label: 'Reply To', content: campaign.reply_to },
    { label: 'Subject', content: campaign.subject },
    { label: 'Status', content: campaign.status },
    { label: 'Content', content: <Button { ...design } /> }
  ]

  return <List { ...config } />

}

Details.propTypes = {
  campaign: PropTypes.object
}

export default Details
