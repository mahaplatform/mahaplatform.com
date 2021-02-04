import ContactAvatar from '@apps/crm/admin/tokens/contact_avatar'
import { Audit, Container, List, ModalPanel } from '@admin'
import PropTypes from 'prop-types'
import Button from '../../button'
import Player from './player'
import moment from 'moment'
import React from 'react'

class Voicemail extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    network: PropTypes.object,
    phone: PropTypes.object,
    router: PropTypes.object,
    tasks: PropTypes.object
  }

  static propTypes = {
    audits: PropTypes.array,
    program: PropTypes.object,
    voicemail: PropTypes.object,
    onPop: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleHandle = this._handleHandle.bind(this)
  _handleHeard = this._handleHeard.bind(this)
  _handleInfo = this._handleInfo.bind(this)
  _handlePlaceCall = this._handlePlaceCall.bind(this)

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
      { icon: 'phone', label: 'call', handler: this._handlePlaceCall },
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

  _handleCall(client) {
    const { voicemail, program } = this.props
    const { admin, phone } = this.context
    this.context.phone.call({
      program,
      client,
      number: voicemail.phone_number,
      contact: voicemail.contact
    })
  }

  _handleHandle() {
    const { program, voicemail } = this.props
    if(voicemail.was_handled) return
    this.context.network.request({
      endpoint: `/api/admin/phone/programs/${program.id}/voicemails/${voicemail.id}/handled`,
      method: 'patch'
    })
  }

  _handleHeard() {
    const { program, voicemail } = this.props
    this.context.network.request({
      endpoint: `/api/admin/phone/programs/${program.id}/voicemails/${voicemail.id}/heard`,
      method: 'patch'
    })
  }

  _handleInfo() {
    const { voicemail } = this.props
    this.context.router.history.push(`/crm/contacts/${voicemail.contact.id}`)
  }

  _handlePlaceCall() {
    const { user } = this.context.admin
    if(!user.cell_phone) return this._handleCall(number, 'maha')
    this.context.tasks.open({
      items: [
        { label: 'Call with cell phone', handler: this._handleCall.bind(this, 'cell') },
        { label: 'Call with Maha phone', handler: this._handleCall.bind(this, 'maha') },
      ]
    })
  }

}

const mapResources = (props, context) => ({
  audits: `/api/admin/maha_voicemails/${props.voicemail_id}/audits`,
  voicemail: {
    endpoint: `/api/admin/phone/programs/${props.program.id}/voicemails/${props.voicemail_id}`,
    refresh: `/admin/phone/programs/${props.program.id}/voicemails/${props.voicemail_id}`,
  }
})

export default Container(mapResources)(Voicemail)
