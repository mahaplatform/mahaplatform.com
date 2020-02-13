import Recipients from '../../../components/recipients'
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

  const to = {
    label: '1542 Contacts',
    className: 'link',
    modal: <Recipients />
  }

  config.items = [
    { label: 'Title', content: campaign.title },
    { label: 'Program', content: campaign.program.title },
    { label: 'To', content: <Button { ...to } /> },
    { label: 'Status', content: campaign.status },
    { label: 'Content', content: <Button { ...design } /> }
  ]

  return <List { ...config } />

}

Details.propTypes = {
  campaign: PropTypes.object
}

export default Details
