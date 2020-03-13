import PropTypes from 'prop-types'
import React from 'react'

const triggers = {
  pickup: { icon: 'phone', text: 'Contact picked up phone' },
  response: { icon: 'check-square-o', text: 'Form is submitted' },
  open: { icon: 'envelope-open', text: 'Email is opened' },
  click: { icon: 'mouse-pointer', text: 'Email is clicked' },
  list: { icon: 'users', text: 'Contact is added to list' },
  topic: { icon: 'book', text: 'Contact is added to topic' },
  property: { icon: 'id-card', text: 'Contact property is updated' },
  manual: { icon: 'plus', text: 'Contact is enrolled' },
  sms: { icon: 'phone', text: 'Outbound SMS' }
}

const blocks = {
  consent: { icon: 'thumbs-up' },
  email: { icon: 'envelope-open' },
  ifthen: { icon: 'sitemap' },
  play: { icon: 'play' }
}

class WorkflowActions extends React.PureComponent {

  static propTypes = {
    actions: PropTypes.array,
    trigger_type: PropTypes.string
  }

  render() {
    const { actions, trigger_type } = this.props
    return (
      <div className="crm-workflow-actions">
        <div className="crm-workflow-action">
          <div className="crm-workflow-action-icon trigger">
            <i className={`fa fa-${triggers[trigger_type].icon}`} />
          </div>
          <div className="crm-workflow-action-label">
            { triggers[trigger_type].text }
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
