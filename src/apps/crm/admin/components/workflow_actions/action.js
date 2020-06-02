import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

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

class Action extends React.PureComponent {

  static propTypes = {
    action: PropTypes.object,
    enrollment: PropTypes.object
  }

  state = {
    expanded: false
  }

  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { action, enrollment } = this.props
    const { asset, data, email, list, program, recording, step, topic, user } = action
    const { config } = step
    const { expanded } = this.state
    return (
      <div className="crm-workflow-action">
        <div className="crm-workflow-action-icon">
          <div className={`crm-workflow-action-action ${action.step.type}`}>
            <i className={`fa fa-${blocks[action.step.action].icon}`} />
          </div>
        </div>
        <div className="crm-workflow-action-label">
          <span onClick={ this._handleToggle }>
            <i className={`fa fa-fw fa-${ this._getIcon() }`} /> <strong>
              { action.step.action.toUpperCase() }
            </strong>
          </span>
          { expanded &&
            <div className="crm-workflow-action-details">
              { step.type === 'contact' && step.action === 'consent' && program &&
                <span>
                  { config.action === 'add' ? 'Opted in to' : 'Oped out of' } { config.channel_type } channel
                </span>
              }
              { step.type === 'contact' && step.action === 'list' && list &&
                <span>
                  { config.action === 'add' ? 'Added to' : 'Removed from' } { list.title }
                </span>
              }
              { step.type === 'contact' && step.action === 'topic' && topic &&
                <span>
                  { config.action === 'add' ? 'Added to' : 'Removed from' } { topic.title }
                </span>
              }
              { step.type === 'control' && step.action === 'ifthen' &&
                <span>BRANCH: { data.branch }</span>
              }
              { step.type === 'control' && step.action === 'set' &&
                <span>{ config.name.value } = { data[config.code] }</span>
              }
              { step.type === 'control' && step.action === 'wait' &&
                <span>Waited until { moment(action.waited_until).format('MM/DD/YY, hh:mmA') }</span>
              }
              { step.type === 'sms' && step.action === 'question' &&
                <span>
                  Q: { action.sms ? action.sms.body : step.config.message }<br />
                  A: { data[step.config.code] }
                </span>
              }
              { step.type === 'sms' && step.action === 'message' &&
                <span>{ action.sms ? action.sms.body : step.config.message }</span>
              }
              { step.type === 'voice' && step.action === 'say' &&
                <span>Said { `"${data.message}"` }</span>
              }
              { step.type === 'voice' && step.action === 'play' && asset &&
                <span>Played <Button { ...this._getPlayButton(asset) }/></span>
              }
              { step.type === 'voice' && step.action === 'question' && asset &&
                <span>Asked <Button { ...this._getPlayButton(asset) }/>, answered { data[config.code] }</span>
              }
              { step.type === 'voice' && step.action === 'question' && data.question &&
                <span>
                  Q: { data.question }<br />
                  A: { data.answer }
                </span>
              }
              { step.type === 'voice' && step.action === 'record' && recording &&
                <span>Captured <Button { ...this._getPlayButton(recording) }/></span>
              }
              { step.type === 'voice' && step.action === 'dial' && data.status === 'failed' &&
                <span>
                  Unable to connect to { data.number &&
                    <span>{ data.number}</span>
                  } { user &&
                    <span>{ user.full_name }</span>
                  }
                </span>
              }
              { step.type === 'voice' && step.action === 'dial' && data.status === 'completed' &&
                <span>
                  Connected call to { data.number &&
                    <span>{ data.number}</span>
                  } { user &&
                    <span>{ user.full_name } ({ user.cell_phone })</span>
                  } for { data.duration } seconds
                </span>
              }
              { step.type === 'administrative' && step.action === 'email' && config.user &&
                <span>Sent internal email to { config.user.full_name }</span>
              }
              { step.type === 'administrative' && step.action === 'sms' && config.user &&
                <span>Sent internal sms to { config.user.full_name }</span>
              }
              { step.type === 'communication' && step.action === 'email' && email &&
                <span>Sent <Button { ...this._getEmailButton(enrollment.contact, email) }/></span>
              }
            </div>
          }
        </div>
        <div className="crm-workflow-action-timestamp">
          { moment(action.created_at).format('MMM D YYYY [@] h:mmA') }
        </div>
      </div>
    )
  }

  _getIcon() {
    const { expanded } = this.state
    return expanded ? 'caret-down' : 'caret-right'
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

  _handleToggle() {
    const { expanded} = this.state
    this.setState({
      expanded: !expanded
    })
  }

}

export default Action
