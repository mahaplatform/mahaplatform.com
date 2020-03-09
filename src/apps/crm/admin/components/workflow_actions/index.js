import PropTypes from 'prop-types'
import React from 'react'

const blocks = {
  consent: { icon: 'thumbs-up' },
  email: { icon: 'envelope-open' },
  ifthen: { icon: 'sitemap' }
}

class WorkflowActions extends React.PureComponent {

  static propTypes = {
    actions: PropTypes.array
  }

  render() {
    const { actions } = this.props
    return (
      <div className="crm-workflow-actions">
        <div className="crm-workflow-action">
          <div className="crm-workflow-action-icon trigger">
            <i className="fa fa-check-square" />
          </div>
          <div className="crm-workflow-action-label">
            Form was submitted
          </div>
        </div>
        <div className="crm-workflow-action-connector" />
        { actions.map((action, index) => [
          <div className="crm-workflow-action" key={`action_${index}`}>
            <div className={`crm-workflow-action-icon ${action.step.type}`}>
              <i className={`fa fa-${blocks[action.step.action].icon}`} />
            </div>
            <div className="crm-workflow-action-label">
              { action.step.action }
            </div>
          </div>,
          <div className="crm-workflow-action-connector" key={`connector_${index}`} />
        ]) }
        <div className="crm-workflow-action">
          <div className="crm-workflow-action-icon ending">
            <i className="fa fa-check" />
          </div>
          <div className="crm-workflow-action-label">
            Workflow is complete
          </div>
        </div>
      </div>
    )
  }

}

export default WorkflowActions
