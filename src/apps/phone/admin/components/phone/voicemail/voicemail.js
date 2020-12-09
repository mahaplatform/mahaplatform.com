import { Audit, Container, List, ModalPanel } from '@admin'
import ContactAvatar from '@apps/crm/admin/tokens/contact_avatar'
import PropTypes from 'prop-types'
import Button from '../button'
import Player from './player'
import moment from 'moment'
import React from 'react'

class Voicemail extends React.Component {

  static contextTypes = {
    network: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    audits: PropTypes.array,
    program: PropTypes.object,
    voicemail: PropTypes.object,
    onCall: PropTypes.func,
    onPop: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleCall = this._handleCall.bind(this)
  _handleHandle = this._handleHandle.bind(this)
  _handleHeard = this._handleHeard.bind(this)
  _handleInfo = this._handleInfo.bind(this)

  render() {
    const buttons = this._getButtons()
    const { voicemail } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-phone-detail-container">
          <div className="maha-phone-detail">
            <div className="maha-phone-detail-header">
              <ContactAvatar { ...voicemail.contact } />
              <h2>{ voicemail.contact.display_name }</h2>
              <div className="maha-phone-actions" >
                <div className="maha-phone-action">
                  <Player { ...this._getPlayer() } />
                </div>
                { buttons.map((button, index) => (
                  <div className="maha-phone-action" key={`action_${index}`}>
                    <Button { ...button } />
                  </div>
                ))}
              </div>
            </div>
            <div className="maha-phone-detail-body">
              <List { ...this._getList() } />
            </div>
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getButtons() {
    const { voicemail } = this.props
    return [
      { icon: 'info', label: 'info', handler: this._handleInfo },
      { icon: 'phone', label: 'call', handler: this._handleCall },
      { icon: 'check', label: 'handled', handler: this._handleHandle, depressed: voicemail.was_handled }
    ]
  }

  _getClass() {
    const { playing } = this.state
    const classes = ['maha-phone-voicemail-button']
    if(playing) classes.push('playing')
    return classes.join(' ')
  }

  _getList() {
    const { audits, voicemail } = this.props
    const items = [
      { label: 'Time', content: this._getTimestamp(voicemail) },
      { label: 'Duration', content: voicemail.duration, format: 'duration' }
    ]
    if(audits.length > 0) {
      items.push({ component: <Audit compact={ true } entries={ audits } /> })
    }
    return {
      compact: true,
      items
    }
  }

  _getPanel() {
    return {
      title: 'Voicemail',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _getPlayer() {
    const { voicemail } = this.props
    return {
      voicemail,
      onListen: this._handleHeard
    }
  }

  _getTimestamp(call) {
    const time = moment(call.created_at).format('h:mm A')
    const today = moment().startOf('day')
    const yesterday = moment().subtract(1, 'day').startOf('day')
    const created_at = moment(call.created_at)
    if(today.format('YYMMDD') === created_at.format('YYMMDD')) return `Today, ${time}`
    if(yesterday.format('YYMMDD') === created_at.format('YYMMDD')) return `Yesterday, ${time}`
    if(today.diff(created_at, 'days') < 7) return created_at.format('dddd, h:mm A')
    return created_at.format('MM/DD/YY, h:mm A')
  }

  _handleBack() {
    this.props.onPop()
  }

  _handleCall() {
    const { voicemail, program } = this.props
    this.props.onCall({
      program,
      phone_number: {
        id: voicemail.contact.phone_id
      },
      to: voicemail.contact.phone
    })
  }

  _handleHandle() {
    const { program, voicemail } = this.props
    if(voicemail.was_handled) return
    this.context.network.request({
      endpoint: `/api/admin/crm/programs/${program.id}/voicemails/${voicemail.id}/handled`,
      method: 'patch'
    })
  }

  _handleHeard() {
    const { program, voicemail } = this.props
    this.context.network.request({
      endpoint: `/api/admin/crm/programs/${program.id}/voicemails/${voicemail.id}/heard`,
      method: 'patch'
    })
  }

  _handleInfo() {
    const { voicemail } = this.props
    this.context.router.history.push(`/crm/contacts/${voicemail.contact.id}`)
  }

}

const mapResources = (props, context) => ({
  audits: `/api/admin/automation_recordings/${props.voicemail_id}/audits`,
  voicemail: {
    endpoint: `/api/admin/crm/programs/${props.program.id}/voicemails/${props.voicemail_id}`,
    refresh: `/admin/crm/programs/${props.program.id}/voicemails/${props.voicemail_id}`
  }
})

export default Container(mapResources)(Voicemail)
