import WorkflowActions from '../components/workflow_actions'
import { Container } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Workflow extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    actions: PropTypes.array,
    enrollment: PropTypes.object,
    workflow: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { actions, enrollment, workflow } = this.props
    return (
      <div className="crm-workflow-card">
        <WorkflowActions workflow={ workflow } enrollment={ enrollment } actions={ actions } trigger_type={ workflow.trigger_type } />
      </div>
    )
  }

}

const mapResources = (props, context) => ({
  actions: `/api/admin/crm/workflows/${props.activity.data.workflow_id}/enrollments/${props.activity.data.enrollment_id}/actions`,
  enrollment: `/api/admin/crm/workflows/${props.activity.data.workflow_id}/enrollments/${props.activity.data.enrollment_id}`,
  workflow: `/api/admin/crm/workflows/${props.activity.data.workflow_id}`
})

export default Container(mapResources)(Workflow)
