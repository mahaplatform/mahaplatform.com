import WorkflowActions from '../../../../components/workflow_actions'
import { Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ enrollment, workflow }) => {

  const contact = {
    label: enrollment.contact.display_name,
    className: 'link',
    route: `/admin/crm/contacts/${enrollment.contact.id}`
  }

  const list = {
    sections: [{
      items: [
        { label: 'Contact', content: <Button { ...contact } /> },
        { label: 'Enrolled', content: enrollment.created_at, format: 'datetime' },
        { component: <WorkflowActions trigger_type={ workflow.trigger_type } actions={ enrollment.actions } />}
      ]
    }]
  }

  return <List { ...list } />

}

Details.propTypes = {
  enrollment: PropTypes.object,
  workflow: PropTypes.object
}

export default Details
