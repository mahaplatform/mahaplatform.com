import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Contacts from './contacts'
import Programs from './programs'
import DialPad from './dialpad'
import React from 'react'
import Call from './call'
import SMS from './sms'

const tabs = [
  { icon: 'th', label: 'DialPad', component: DialPad },
  { icon: 'comments', label: 'SMS', component: SMS },
  { icon: 'user', label: 'Contacts', component: Contacts }
]

class Phone extends React.Component {

  static contextTypes = {
    phone: PropTypes.object
  }

  static propTypes = {
    call: PropTypes.object,
    programs: PropTypes.array,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  state = {
    program: null,
    selected: 0
  }

  _handleCall = this._handleCall.bind(this)
  _handleClose = this._handleClose.bind(this)
  _handleHangup = this._handleHangup.bind(this)
  _handlePickup = this._handlePickup.bind(this)
  _handleProgram = this._handleProgram.bind(this)

  render() {
    const { selected } = this.state
    const { call } = this.props
    const tab = tabs[selected]
    return (
      <ModalPanel { ...this._getPanel() }>
        { call.status === 'ready' ?
          <div className="maha-phone-client">
            <div className="maha-phone-client-header">
              <Programs { ...this._getPrograms() } />
            </div>
            <div className="maha-phone-client-body">
              <tab.component { ...this._getComponent() } />
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
    const { call } = this.props
    return {
      call
    }
  }

  _getComponent() {
    const { onPop, onPush } = this.props
    const { program } = this.state
    return {
      program,
      onCall: this._handleCall,
      onPop,
      onPush
    }
  }

  _getPanel() {
    return {
      title: 'Phone',
      color: 'violet',
      leftItems: [
        { icon: 'times', handler: this._handleClose }
      ]
    }
  }

  _getPrograms() {
    const { programs } = this.props
    return {
      program: programs[0],
      programs,
      onChange: this._handleProgram
    }
  }

  _handleCall(to) {
    this.context.phone.call({
      from: '+16072248981',
      to
    })
  }

  _handleClose() {
    this.context.phone.toggle()
  }

  _handleHangup() {
    this.context.phone.hangup()
  }

  _handlePickup() {
    this.context.phone.pickup()
  }

  _handleProgram(program) {
    this.setState({ program })
  }

  _handleSelect(selected) {
    this.setState({ selected })
  }

}

export default Phone
