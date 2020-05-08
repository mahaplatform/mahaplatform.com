import WorkflowActions from '../../../../../components/workflow_actions'
import { Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ actions, session, campaign }) => {

  const contact = {
    label: session.contact.display_name,
    className: 'link',
    route: `/admin/crm/contacts/${session.contact.id}`
  }

  const config = {}

  if(campaign.deleted_at !== null) {
    config.alert = { color: 'red', message: 'This campaign was deleted' }
  }

  config.items = [
    { label: 'Contact', content: <Button { ...contact } /> },
    { label: 'Enrolled', content: session.created_at, format: 'datetime' },
    { component: <WorkflowActions actions={ actions } enrollment={ session } trigger_type={`${campaign.direction}_${campaign.type}`} />}
  ]

  return <List { ...config } />

}

Details.propTypes = {
  actions: PropTypes.array,
  campaign: PropTypes.object,
  session: PropTypes.object
}

export default Details
