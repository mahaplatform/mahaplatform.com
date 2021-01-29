import ContactAvatar from '@apps/crm/admin/tokens/contact_avatar'
import { List, ModalPanel } from '@admin'
import PropTypes from 'prop-types'
import Button from '../../button'
import SMS from '../../sms'
import moment from 'moment'
import React from 'react'
import _ from 'lodash'

class Call extends React.Component {

  static contextTypes = {
    phone: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    program: PropTypes.object,
    call: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleCall = this._handleCall.bind(this)
  _handleInfo = this._handleInfo.bind(this)
  _handleSMS = this._handleSMS.bind(this)

  render() {
    const buttons = this._getButtons()
    const { call } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-phone-detail-container">
          <div className="maha-phone-detail">
            <div className="maha-phone-detail-header">
              <ContactAvatar { ...call.contact } />
              <h2>{ call.contact.display_name }</h2>
              <div className="maha-phone-actions" >
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
    return [
      { icon: 'info', label: 'info', handler: this._handleInfo },
      { icon: 'phone', label: 'call', handler: this._handleCall },
      { icon: 'comments', label: 'sms', handler: this._handleSMS }
    ]
  }

  _getSMS(phone_number) {
    const { program, onPop, onPush } = this.props
    return {
      phone_number,
      program,
      onPop,
      onPush
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

  _getDuration(duration) {
    const pad = (value) => _.padStart(value, 2, 0)
    const minutes = Math.floor(duration / 60)
    const seconds = (duration  - (minutes * 60)) % 60
    const parts = [ pad(minutes), pad(seconds) ]
    return parts.join(':')
  }

  _getList() {
    const { call } = this.props
    const items = [
      { label: 'Program', content: call.program.title },
      { label: 'Time', content: this._getTimestamp(call) },
      { label: 'Duration', content: this._getDuration(call.duration) },
      { label: 'Direction', content: call.direction }
    ]
    if(call.to) items.push({ label: 'From', content: call.from.formatted })
    if(call.from_user) items.push({ label: 'From', content: call.from_user.full_name })
    if(call.to) items.push({ label: 'To', content: call.to.formatted })
    if(call.to_user) items.push({ label: 'To', content: call.to_user.full_name })
    return { items }
  }

  _getPanel() {
    return {
      title: 'Call',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _handleBack() {
    this.props.onPop()
  }

  _handleCall() {
    const { call, program } = this.props
    const { contact, phone_number } = call
    this.context.phone.call({
      program,
      contact,
      phone_number,
      to: phone_number.number
    })
  }

  _handleInfo() {
    const { call } = this.props
    this.context.router.history.push(`/crm/contacts/${call.contact.id}`)
  }

  _handleSMS() {
    const { call } = this.props
    return this.props.onPush(SMS, this._getSMS(call.phone_number))
  }

}

export default Call
