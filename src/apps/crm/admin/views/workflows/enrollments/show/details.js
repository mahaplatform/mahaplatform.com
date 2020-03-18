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
        { component: <WorkflowActions enrollment={ enrollment } trigger_type={ workflow.trigger_type } /> }
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
