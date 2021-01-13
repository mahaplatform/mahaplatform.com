import PropTypes from 'prop-types'
import Action from './action'
import moment from 'moment'
import React from 'react'

const triggers = {
  call_sent: { icon: 'envelope', text: 'Contact picked up phone' },
  call_received: { icon: 'envelope', text: 'Contact called' },
  email_received: { icon: 'envelope', text: 'Contact received email' },
  email_opened: { icon: 'envelope-open', text: 'Contact opened email' },
  email_clicked: { icon: 'envelope-open', text: 'Contact clicked email' },
  enrollment_created: { icon: 'plus', text: 'Contact is enrolled in workflow' },
  interest_created: { icon: 'th-list', text: 'Contact was added to topic' },
  interest_deleted: { icon: 'th-list', text: 'Contact was removed from topic' },
  order_created: { icon: 'shopping-bag', text: 'Contact placed and order' },
  order_shipped: { icon: 'shopping-bag', text: 'Contact order was shipped' },
  property_updated: { icon: 'id-card', text: 'Contact property was updated' },
  response_created: { icon: 'check-square-o', text: 'Contact submited form' },
  registration_created: { icon: 'calendar', text: 'Contact registered for event' },
  sms_sent: { icon: 'envelope', text: 'Contact sent SMS' },
  sms_received: { icon: 'envelope', text: 'Contact received SMS' },
  subscription_created: { icon: 'th-list', text: 'Contact was added to list' },
  subscription_deleted: { icon: 'th-list', text: 'Contact was removed from list' }
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
              <i className={`fa fa-${triggers[trigger_type].icon}`} />
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
        { enrollment.status === 'failed' &&
          <div className="crm-workflow-action">
            <div className="crm-workflow-action-icon">
              <div className="crm-workflow-action-action ending">
                <i className="fa fa-times" />
              </div>
            </div>
            <div className="crm-workflow-action-label">
              <strong>FAILED: </strong>
              The enrollment failed due to an internal error
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
              Workflow was completed
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
    if(trigger_type === 'call_received') {
      return `Contact called ${workflow.phone_number.formatted}`
    } else if(trigger_type === 'call_sent') {
      return `Contact received call from ${workflow.phone_number.formatted}`
    } else if(trigger_type === 'call_received') {
      return `Contact sent SMS to ${workflow.phone_number.formatted}`
    } else if(trigger_type === 'call_sent') {
      return `Contact received SMS from ${workflow.phone_number.formatted}`
    }
    return triggers[trigger_type].text
  }

}

export default WorkflowActions
