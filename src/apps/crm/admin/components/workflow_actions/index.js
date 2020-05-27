import PropTypes from 'prop-types'
import Action from './action'
import moment from 'moment'
import React from 'react'

const types = {
  event: { icon: 'calendar-o', name: 'Workflow', trigger: 'Contact registered for event' },
  pickup: { icon: 'phone', name: 'Call', trigger: 'Contact picked up phone' },
  response: { icon: 'check-square-o', name: 'Workflow', trigger: 'Contact submitted form' },
  delivery: { icon: 'envelope', name: 'Workflow', trigger: 'Email was delivered' },
  open: { icon: 'envelope-open', name: 'Workflow', trigger: 'Email was opened' },
  click: { icon: 'mouse-pointer', name: 'Workflow', trigger: 'Email was clicked' },
  list: { icon: 'th-list', name: 'Workflow', trigger: 'Contact was added to list' },
  topic: { icon: 'lightbulb-o', name: 'Workflow', trigger: 'Contact was added to topic' },
  property: { icon: 'id-card', name: 'Workflow', trigger: 'Contact property was updated' },
  manual: { icon: 'plus', name: 'Workflow', trigger: 'Contact was enrolled' },
  outbound_sms: { icon: 'phone', name: 'Workflow', trigger: 'Contact received an SMS' },
  inbound_sms: { icon: 'phone', name: 'Workflow', trigger: 'Contact sent an SMS' },
  outbound_voice: { icon: 'phone', name: 'Workflow', trigger: 'Contact answered the phone' },
  inbound_voice: { icon: 'phone', name: 'Workflow', trigger: 'Contact called' }
}

class WorkflowActions extends React.PureComponent {

  static propTypes = {
    actions: PropTypes.array,
    enrollment: PropTypes.object,
    trigger_type: PropTypes.string,
    workflow: PropTypes.object
  }

  render() {
    const { actions, enrollment, trigger_type } = this.props
    return (
      <div className="crm-workflow-actions">
        <div className="crm-workflow-action">
          <div className="crm-workflow-action-icon">
            <div className="crm-workflow-action-action trigger">
              <i className={`fa fa-${types[trigger_type].icon}`} />
            </div>
          </div>
          <div className="crm-workflow-action-label">
            <strong>TRIGGER: </strong>
            { this._getTrigger() }
          </div>
          <div className="crm-workflow-action-timestamp">
            { moment(enrollment.created_at).format('MMM D YYYY [@] h:mmA') }
          </div>
        </div>
        { actions.map((action, index) => (
          <Action { ...this._getAction(action) } key={`action_${index}`} />
        )) }
        { enrollment.status === 'lost' &&
          <div className="crm-workflow-action">
            <div className="crm-workflow-action-icon">
              <div className="crm-workflow-action-action ending">
                <i className="fa fa-check" />
              </div>
            </div>
            <div className="crm-workflow-action-label">
              <strong>LOST: </strong>
              Contact was lost in workflow
            </div>
          </div>
        }
        { enrollment.status === 'completed' &&
          <div className="crm-workflow-action">
            <div className="crm-workflow-action-icon">
              <div className="crm-workflow-action-action ending">
                <i className="fa fa-check" />
              </div>
            </div>
            <div className="crm-workflow-action-label">
              <strong>COMPLETE: </strong>
              { types[trigger_type].name } was completed
            </div>
            <div className="crm-workflow-action-timestamp">
              { moment(enrollment.completed_at).format('MMM D YYYY [@] h:mmA') }
            </div>
          </div>
        }
      </div>
    )
  }

  _getAction(action) {
    const { enrollment } = this.props
    return {
      action,
      enrollment
    }
  }

  _getTrigger() {
    const { trigger_type, workflow } = this.props
    if(trigger_type === 'inbound_voice') {
      return `Contact called ${workflow.phone_number.formatted}`
    } else if(trigger_type === 'outbound_voice') {
      return `Contact received call from ${workflow.phone_number.formatted}`
    }
    return types[trigger_type].trigger
  }

}

export default WorkflowActions
