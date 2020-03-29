import PropTypes from 'prop-types'
import React from 'react'

const types = {
  pickup: { icon: 'phone', name: 'call', trigger: 'Contact picked up phone' },
  response: { icon: 'check-square-o', name: 'workflow', trigger: 'Form is submitted' },
  open: { icon: 'envelope-open', name: 'workflow', trigger: 'Email is opened' },
  click: { icon: 'mouse-pointer', name: 'workflow', trigger: 'Email is clicked' },
  list: { icon: 'th-list', name: 'workflow', trigger: 'Contact is added to list' },
  topic: { icon: 'lightbulb-o', name: 'Workflow', trigger: 'Contact is added to topic' },
  property: { icon: 'id-card', name: 'workflow', trigger: 'Contact property is updated' },
  manual: { icon: 'plus', name: 'workflow', trigger: 'Contact is enrolled' },
  outbound_sms: { icon: 'phone', name: 'workflow', trigger: 'Outbound SMS' },
  inbound_sms: { icon: 'phone', name: 'workflow', trigger: 'Incoming SMS' },
  outbound_voice: { icon: 'phone', name: 'workflow', trigger: 'Contact picked up phone' },
  inbound_voice: { icon: 'phone', name: 'workflow', trigger: 'Contact called' }
}

const blocks = {
  consent: { icon: 'thumbs-up' },
  email: { icon: 'envelope-open' },
  question: { icon: 'question' },
  ifthen: { icon: 'sitemap' },
  play: { icon: 'play' },
  say: { icon: 'volume-control-phone' },
  message: { icon: 'comment' },
  sms: { icon: 'comment' },
  internal_sms: { icon: 'comment' },
  record: { icon: 'microphone' },
  topic: { icon: 'lightbulb-o' },
  list: { icon: 'th-list' }
}

class WorkflowActions extends React.PureComponent {

  static propTypes = {
    enrollment: PropTypes.object,
    trigger_type: PropTypes.string
  }

  render() {
    const { enrollment, trigger_type } = this.props
    return (
      <div className="crm-workflow-actions">
        <div className="crm-workflow-action">
          <div className="crm-workflow-action-icon trigger">
            <i className={`fa fa-${types[trigger_type].icon}`} />
          </div>
          <div className="crm-workflow-action-label">
            { types[trigger_type].trigger }
          </div>
        </div>
        { enrollment.actions.map((action, index) => [
          <div className="crm-workflow-action-connector" key={`connector_${index}`} />,
          <div className="crm-workflow-action" key={`action_${index}`}>
            <div className={`crm-workflow-action-icon ${action.step.type}`}>
              <i className={`fa fa-${blocks[action.step.action].icon}`} />
            </div>
            <div className="crm-workflow-action-label">
              { action.step.action }
            </div>
          </div>
        ]) }
        { enrollment.status !== 'active' &&
          <div className="crm-workflow-action-connector"/>
        }
        { enrollment.status === 'lost' &&
          <div className="crm-workflow-action">
            <div className="crm-workflow-action-icon ending">
              <i className="fa fa-check" />
            </div>
            <div className="crm-workflow-action-label">
              Contact was lost in workflow
            </div>
          </div>
        }
        { enrollment.status === 'completed' &&
          <div className="crm-workflow-action">
            <div className="crm-workflow-action-icon ending">
              <i className="fa fa-check" />
            </div>
            <div className="crm-workflow-action-label">
              { types[trigger_type].name } is complete
            </div>
          </div>
        }
      </div>
    )
  }

}

export default WorkflowActions
