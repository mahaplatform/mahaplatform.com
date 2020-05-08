import WorkflowActions from '../../../../../components/workflow_actions'
import { Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ campaign, enrollment }) => {

  const contact = {
    label: enrollment.contact.display_name,
    className: 'link',
    route: `/admin/crm/contacts/${enrollment.contact.id}`
  }

  const list = {
    sections: [{
      items: [
        { label: 'Contact', content: <Button { ...contact } /> },
        { label: 'Date', content: enrollment.created_at, format: 'datetime' },
        { component: <WorkflowActions enrollment={ enrollment } trigger_type={`${campaign.direction}_${campaign.type}`} />}
      ]
    }]
  }

  return <List { ...list } />

}

Details.propTypes = {
  campaign: PropTypes.object,
  enrollment: PropTypes.object
}

export default Details
