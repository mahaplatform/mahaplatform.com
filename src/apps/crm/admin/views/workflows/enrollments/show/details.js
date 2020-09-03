import WorkflowActions from '../../../../components/workflow_actions'
import { Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ actions, enrollment, workflow }) => {

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
        ...enrollment.unenrolled_at ? [{ label: 'Unenrolled', content: enrollment.unenrolled_at, format: 'datetime' }] : [],
        { component: <WorkflowActions workflow={ workflow }s actions={ actions } enrollment={ enrollment } trigger_type={ workflow.trigger_type } /> }
      ]
    }]
  }

  if(enrollment.status === 'canceled') {
    list.alert = { color: 'red', message: 'This enrollment was canceled' }
  } else if(workflow.status === 'lost') {
    list.alert = { color: 'red', message: 'This enrollment was lost' }
  } else if(workflow.status === 'active') {
    list.alert = { color: 'yellow', message: 'This enrollment is active' }
  } else if(workflow.status === 'completed') {
    list.alert = { color: 'green', message: 'This enrollment was completed' }
  }
  
  return <List { ...list } />

}

Details.propTypes = {
  actions: PropTypes.array,
  enrollment: PropTypes.object,
  workflow: PropTypes.object
}

export default Details
