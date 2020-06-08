import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Settings from './settings'
import Contacts from './contacts'
import Programs from './programs'
import Dialer from './dialer'
import Calls from './calls'
import Users from './users'
import React from 'react'
import SMS from './sms'

const tabs = [
  { icon: 'th', label: 'Keypad', component: Dialer },
  { icon: 'phone', label: 'Calls', component: Calls },
  { icon: 'comments', label: 'SMS', component: SMS },
  { icon: 'user', label: 'Contacts', component: Contacts },
  { icon: 'user-circle', label: 'Users', component: Users }
]

class Phone extends React.Component {

  static contextTypes = {
    phone: PropTypes.object
  }

  static propTypes = {
    programs: PropTypes.array,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  state = {
    program: null,
    selected: 0
  }

  _handleClose = this._handleClose.bind(this)
  _handleProgram = this._handleProgram.bind(this)
  _handleSettings = this._handleSettings.bind(this)

  render() {
    const { program, selected } = this.state
    const tab = tabs[selected]
    if(!program) return null
    return (
      <ModalPanel { ...this._getPanel() }>
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
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { programs } = this.props
    this.setState({
      program: programs[0]
    })
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

  _getComponent() {
    const { onPop, onPush } = this.props
    const { program } = this.state
    return {
      program,
      onPop,
      onPush
    }
  }

  _getPanel() {
    return {
      title: 'Phone',
      leftItems: [
        { icon: 'times', handler: this._handleClose }
      ],
      rightItems: [
        { icon: 'ellipsis-v', handler: this._handleSettings }
      ]
    }
  }

  _getPrograms() {
    const { programs } = this.props
    const { program } = this.state
    return {
      program,
      programs,
      onChange: this._handleProgram
    }
  }

  _getTabPanel() {
    const { onPop } = this.props
    const { program } = this.state
    return {
      program,
      onPop
    }
  }

  _handleClose() {
    this.context.phone.toggle()
  }

  _handleProgram(program) {
    this.setState({ program })
  }

  _handleSelect(selected) {
    return this.setState({ selected })
  }

  _handleSettings() {
    this.props.onPush(Settings, this._getTabPanel())
  }

}

export default Phone
