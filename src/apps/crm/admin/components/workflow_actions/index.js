import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
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

const blocks = {
  dial: { icon: 'phone' },
  consent: { icon: 'thumbs-up' },
  email: { icon: 'envelope-open' },
  question: { icon: 'question' },
  ifthen: { icon: 'sitemap' },
  play: { icon: 'play' },
  say: { icon: 'volume-control-phone' },
  message: { icon: 'comment' },
  sms: { icon: 'comment' },
  set: { icon: 'times' },
  internal_sms: { icon: 'comment' },
  record: { icon: 'microphone' },
  topic: { icon: 'lightbulb-o' },
  list: { icon: 'th-list' },
  wait: { icon: 'clock-o' },
  goal: { icon: 'flag' }
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
        { actions.map((action, index) => [
          <div className="crm-workflow-action" key={`action_${index}`}>
            <div className="crm-workflow-action-icon">
              <div className={`crm-workflow-action-action ${action.step.type}`}>
                <i className={`fa fa-${blocks[action.step.action].icon}`} />
              </div>
            </div>
            <div className="crm-workflow-action-label">
              <i className="fa fa-caret-right" /> <strong>{ action.step.action.toUpperCase() }</strong>
              { this._getDescription(enrollment, action) }
            </div>
            <div className="crm-workflow-action-timestamp">
              { moment(action.created_at).format('MMM D YYYY [@] h:mmA') }
            </div>
          </div>
        ]) }
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

  _getTrigger() {
    const { trigger_type, workflow } = this.props
    if(trigger_type === 'inbound_voice') {
      return `Contact called ${workflow.phone_number.formatted}`
    } else if(trigger_type === 'outbound_voice') {
      return `Contact received call from ${workflow.phone_number.formatted}`
    }

    return types[trigger_type].trigger
  }

  _getDescription(enrollment, action) {
    const { asset, data, email, list, program, recording, step, topic } = action
    if(!step) return ''
    const { config } = step
    if(step.action === 'consent' && program) {
      return `: ${config.action === 'add' ? 'Opted in to' : 'Oped out of' } ${config.channel_type} channel`
    } else if(step.action === 'list' && list) {
      return `: ${config.action === 'add' ? 'Added to' : 'Removed from' } ${list.title}`
    } else if(step.action === 'topic' && topic) {
      return `: ${config.action === 'add' ? 'Added to' : 'Removed from' } ${topic.title}`
    } else if(step.action === 'ifthen') {
      return `: ${data.branch}`
    } else if(step.action === 'set') {
      return `: ${config.name.value} = ${data[config.code]}`
    } else if(step.action === 'play' && asset) {
      return <span>: Played <Button { ...this._getPlayButton(asset) }/></span>
    } else if(step.action === 'question' && asset) {
      return <span>: Asked <Button { ...this._getPlayButton(asset) }/>, answered { data[config.code] }</span>
    } else if(step.action === 'record' && recording) {
      return <span>: Captured <Button { ...this._getPlayButton(recording) }/></span>
    } else if(step.action === 'say') {
      return `: Said "${data.message}"`
    } else if(step.action === 'dial') {
      return `: Connected call to ${config.number}`
    } else if(step.type === 'administrative' && step.action === 'email' && config.user) {
      return `: Sent internal email to ${config.user.full_name}`
    } else if(step.type === 'administrative' && step.action === 'sms' && config.user) {
      return `: Sent internal sms to ${config.user.full_name}`
    } else if(step.type === 'communication' && step.action === 'email' && email) {
      return <span>: Sent <Button { ...this._getEmailButton(enrollment.contact, email) }/></span>
    }
    return ''
  }

  _getEmailButton(contact, email) {
    return {
      label: email.subject,
      className: 'link',
      route: `/admin/crm/contacts/${contact.id}/emails/${email.id}`
    }
  }

  _getPlayButton(asset) {
    return {
      label: 'recording',
      className: 'link',
      handler: this._handlePlay.bind(this, asset)
    }
  }

  _handlePlay(asset) {
    const audio = new Audio(asset.signed_url)
    audio.play()
  }

}

export default WorkflowActions
