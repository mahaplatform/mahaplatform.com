import { Button, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Programs from './programs'
import DialPad from './dialpad'
import React from 'react'

const tabs = [
  { icon: 'th', label: 'DialPad' },
  { icon: 'clock-o', label: 'History' },
  { icon: 'user', label: 'Contacts' }
]

class Phone extends React.Component {

  static contextTypes = {
    phone: PropTypes.object
  }

  static propTypes = {
    programs: PropTypes.array,
    status: PropTypes.string,
    onClose: PropTypes.func
  }

  state = {
    number: '',
    selected: 0
  }

  _handleCall = this._handleCall.bind(this)
  _handleNumber = this._handleNumber.bind(this)
  _handlePickup = this._handlePickup.bind(this)
  _handleHangup = this._handleHangup.bind(this)

  render() {
    const { selected } = this.state
    const { status } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-phone-client">
          <div className="maha-phone-client-header">
            <Programs { ...this._getPrograms() } />
          </div>
          { status === 'ready' &&
            <div className="maha-phone-client-body">
              <DialPad { ...this._getDialPad() } />
              <div className="maha-phone-action">
                <div className="maha-phone-call" onClick={ this._handleCall }>
                  <i className="fa fa-phone" />
                </div>
              </div>
            </div>
          }
          { status === 'ringing' &&
            <div className="maha-phone-client-body">
              <Button { ...this._getPickup() } />
            </div>
          }
          { status === 'active' &&
            <div className="maha-phone-client-body">
              <Button { ...this._getHangup() } />
            </div>
          }
          <div className="maha-phone-client-footer">
            { tabs.map((tab, index) =>(
              <div className={`maha-phone-client-footer-item${index === selected ? ' selected' : ''}`} key={`tab_${index}`}>
                <i className={`fa fa-${ tab.icon }`} />
                <span>{ tab.label }</span>
              </div>
            ))}
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getDialPad() {
    return {
      onChange: this._handleNumber
    }
  }

  _getHangup() {
    return {
      label: 'Hangup',
      className: 'link',
      handler: this._handleHangup
    }
  }

  _handleNumber(number) {
    this.setState({ number })
  }

  _getPickup() {
    return {
      label: 'Pickup',
      className: 'link',
      handler: this._handlePickup
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

  _getPrograms() {
    const { programs } = this.props
    return {
      programs
    }
  }

  _handleCall() {
    const { number } = this.state
    this.context.phone.call({
      from: '+16072248981',
      to: number
    })
  }

  _handleHangup() {
    this.context.phone.hangup()
  }

  _handlePickup() {
    this.context.phone.pickup()
  }

}

export default Phone
