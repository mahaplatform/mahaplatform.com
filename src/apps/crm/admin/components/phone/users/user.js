import { Avatar, Container, List, ModalPanel } from 'maha-admin'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import Button from '../button'
import PropTypes from 'prop-types'
import SMS from '../sms/sms'
import React from 'react'

class User extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    program: PropTypes.object,
    user: PropTypes.object,
    onCall: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleCall = this._handleCall.bind(this)
  _handleSMS = this._handleSMS.bind(this)

  render() {
    const buttons = this._getButtons()
    const { user } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-phone-contact-container">
          <div className="maha-phone-contact">
            <div className="maha-phone-contact-header">
              <Avatar user={ user } presence={ false } />
              <h2>{ user.full_name }</h2>
              <p>{ user.email }</p>
              <div className="maha-phone-actions" >
                { buttons.map((button, index) => (
                  <div className="maha-phone-action" key={`action_${index}`}>
                    <Button { ...button } />
                  </div>
                ))}
              </div>
            </div>
            <div className="maha-phone-contact-body">
              <List { ...this._getList() } />
            </div>
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getButtons() {
    const { user } = this.props
    const disabled = user.cell_phone === null
    return [
      { icon: 'comment', label: 'chat', handler: this._handleSMS },
      { icon: 'phone', label: 'call', handler: this._handleCall, disabled },
      { icon: 'comments', label: 'sms', handler: this._handleSMS, disabled }
    ]
  }

  _getList() {
    const { user } = this.props
    const phone = this._getPhone()
    return {
      items: [
        { label: 'Status', content: 'not online' },
        { label: 'Cell Phone', content: phone || 'none' }
      ]
    }
  }

  _getPanel() {
    return {
      title: 'User',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _getPhone() {
    const { user } = this.props
    if(!user.cell_phone) return null
    const parsed = parsePhoneNumberFromString(user.cell_phone, 'US')
    return parsed.formatNational()
  }

  _getSMS() {
    const { contact, channel, program, onPop, onPush } = this.props
    return {
      channel: {
        ...channel,
        contact
      },
      program,
      onPop,
      onPush
    }
  }

  _handleBack() {
    this.props.onPop()
  }

  _handleChoose(to_user) {
    const { admin } = this.context
    this.props.onCall({
      from_user: admin.user,
      to_user
    })
  }

  _handleCall() {
    const { admin } = this.context
    const { user } = this.props
    this.props.onCall({
      from_user: admin.user,
      to_user: user
    })
  }

  _handleSMS() {
    this.props.onPush(SMS, this._getSMS())
  }

}

const mapResources = (props, context) => ({
  user: `/api/admin/users/${props.user_id}`
})

export default Container(mapResources)(User)
