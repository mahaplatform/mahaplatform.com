import WorkflowActions from '../components/workflow_actions'
import { Button, Container } from 'maha-admin'
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
        <table className="ui celled compact unstackable table">
          <tbody>
            <tr>
              <td>Workflow</td>
              <td><Button { ...this._getWorkflow() } /></td>
            </tr>
            <tr>
              <td>Enrollment</td>
              <td><Button { ...this._getEnrollment() } /></td>
            </tr>
          </tbody>
        </table>
        <WorkflowActions workflow={ workflow } enrollment={ enrollment } actions={ actions } trigger_type={ workflow.trigger_type } />
      </div>
    )
  }

  _getEnrollment() {
    const { enrollment, workflow } = this.props
    return {
      label: 'View Enrollment',
      className: 'link',
      route: `/admin/automation/workflows/${workflow.id}/enrollments/${enrollment.id}`
    }
  }

  _getWorkflow() {
    const { workflow } = this.props
    return {
      label: workflow.title,
      className: 'link',
      route: `/admin/automation/workflows/${workflow.id}`
    }
  }

}

const mapResources = (props, context) => ({
  actions: `/api/admin/automation/workflows/${props.activity.data.workflow_id}/enrollments/${props.activity.data.enrollment_id}/actions`,
  enrollment: `/api/admin/automation/workflows/${props.activity.data.workflow_id}/enrollments/${props.activity.data.enrollment_id}`,
  workflow: `/api/admin/automation/workflows/${props.activity.data.workflow_id}`
})

export default Container(mapResources)(Workflow)
