import WorkflowActions from '../../../../../components/workflow_actions'
import { Button, Comments, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ actions, enrollment, campaign }) => {

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
        { component: <WorkflowActions actions={ actions } enrollment={ enrollment } trigger_type={`${campaign.direction}_${campaign.type}`} />}
      ]
    }],
    footer: <Comments entity={`crm_workflow_enrollmentsa/${enrollment.id}`} />
  }

  return <List { ...list } />

}

Details.propTypes = {
  actions: PropTypes.array,
  campaign: PropTypes.object,
  enrollment: PropTypes.object
}

export default Details
