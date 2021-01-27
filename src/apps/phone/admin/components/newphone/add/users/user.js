import { Avatar, Container, List, ModalPanel } from '@admin'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Button from '../../button'
import SMS from '../../sms'
import React from 'react'
import _ from 'lodash'

class User extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    phone: PropTypes.object,
    router: PropTypes.object,
    tasks: PropTypes.object
  }

  static propTypes = {
    presence: PropTypes.array,
    program: PropTypes.object,
    user: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleCall = this._handleCall.bind(this)
  _handleCallMaha = this._handleCallMaha.bind(this)
  _handleCallMobile = this._handleCallMobile.bind(this)
  _handleSMS = this._handleSMS.bind(this)

  render() {
    const buttons = this._getButtons()
    const { user } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-phone-detail-container">
          <div className="maha-phone-detail">
            <div className="maha-phone-detail-header">
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
            <div className="maha-phone-detail-body">
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
    const phone = this._getPhone()
    return {
      items: [
        { label: 'Status', content: this._getStatus() },
        { label: 'Mobile Phone', content: phone || 'none' }
      ]
    }
  }

  _getOnline() {
    const { presence, user } = this.props
    return _.find(presence, {
      user_id: user.id
    })
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

  _getStatus() {
    const { presence, user } = this.props
    const user_id = user.id
    const active = _.find(presence, { user_id, status: 'active' })
    if(active) return 'active'
    const absent = _.find(presence, { user_id, status: 'absent' })
    if(absent) return 'away'
    return 'not online'
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
    const phone = this._getPhone()
    const online = this._getOnline()
    const items = []
    if(online) items.push({ label: 'Call Maha Phone', handler: this._handleCallMaha })
    if(phone) items.push({ label: `Call ${phone}`, handler: this._handleCallMobile })
    if(items.length === 1) return items[0].handler()
    this.context.tasks.open({ items })
  }

  _handleCallMaha() {
    const { admin } = this.context
    const { program, user } = this.props
    this.context.phone.onCall({
      program,
      to_user: user
    })
  }

  _handleCallMobile() {
    const { program, user } = this.props
    this.context.phone.onCall({
      program,
      to_user: user,
      number: user.cell_phone
    })
  }

  _handleSMS() {
    this.props.onPush(SMS, this._getSMS())
  }

}

const mapResources = (props, context) => ({
  user: `/api/admin/users/${props.user_id}`
})

User = Container(mapResources)(User)

const mapStateToProps = (state, props) => ({
  presence: state.maha.presence.presence
})

User = connect(mapStateToProps)(User)


export default User
