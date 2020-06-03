import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Contacts from './contacts'
import DialPad from './dialpad'
import History from './history'
import React from 'react'
import Call from './call'

const tabs = [
  { icon: 'th', label: 'DialPad', component: DialPad },
  { icon: 'clock-o', label: 'History', component: History },
  { icon: 'user', label: 'Contacts', component: Contacts }
]

class Phone extends React.Component {

  static contextTypes = {
    phone: PropTypes.object
  }

  static propTypes = {
    call: PropTypes.object,
    programs: PropTypes.array,
    muted: PropTypes.bool,
    status: PropTypes.string,
    onClose: PropTypes.func
  }

  state = {
    selected: 0
  }

  _handleCall = this._handleCall.bind(this)
  _handlePickup = this._handlePickup.bind(this)
  _handleHangup = this._handleHangup.bind(this)

  render() {
    const { selected } = this.state
    const { status } = this.props
    const tab = tabs[selected]
    return (
      <ModalPanel { ...this._getPanel() }>
        { status === 'ready' ?
          <div className="maha-phone-client">
            <div className="maha-phone-client-body">
              <tab.component { ...this._getDialPad() } />
            </div>
            <div className="maha-phone-client-footer">
              { tabs.map((tab, index) =>(
                <div { ...this._getTab(index) } key={`tab_${index}`}>
                  <i className={`fa fa-${ tab.icon }`} />
                  <span>{ tab.label }</span>
                </div>
              ))}
            </div>
          </div> :
          <Call { ...this._getCall() } />
        }
      </ModalPanel>
    )
  }

  _getTab(index) {
    const { selected } = this.state
    const classes = ['maha-phone-client-footer-item']
    if(index === selected) classes.push('selected')
    return {
      className: classes.join(' '),
      onClick: this._handleSelect.bind(this, index)
    }
  }

  _getCall() {
    const { call, muted, status } = this.props
    return {
      call: {
        ...call,
        muted,
        status
      }
    }
  }

  _getDialPad() {
    const { programs } = this.props
    return {
      programs,
      onCall: this._handleCall
    }
  }

  _getPanel() {
    const { onClose } = this.props
    return {
      title: 'Phone',
      color: 'blue',
      leftItems: [
        { icon: 'times', handler: onClose }
      ]
    }
  }

  _handleCall(to) {
    this.context.phone.call({
      from: '+16072248981',
      to
    })
  }

  _handleHangup() {
    this.context.phone.hangup()
  }

  _handlePickup() {
    this.context.phone.pickup()
  }

  _handleSelect(selected) {
    this.setState({ selected })
  }

}

export default Phone
