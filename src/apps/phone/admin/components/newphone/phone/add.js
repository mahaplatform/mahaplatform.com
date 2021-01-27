import { ModalPanel } from '@admin'
import PropTypes from 'prop-types'
import Contacts from './contacts'
import Programs from './programs'
import Dialer from './dialer'
import Users from './users'
import React from 'react'

const tabs = [
  { icon: 'th', label: 'Keypad', component: Dialer },
  { icon: 'user', label: 'Contacts', component: Contacts },
  { icon: 'user-circle', label: 'Users', component: Users }
]

class Add extends React.Component {

  static contextTypes = {
    phone: PropTypes.object
  }

  static propTypes = {
    programs: PropTypes.array,
    program: PropTypes.object,
    onCall: PropTypes.func,
    onProgram: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  state = {
    selected: 0
  }

  _handleBack = this._handleBack.bind(this)

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
    const { program } = this.props
    this.setState({ program })
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
    const { onCall, onPop, onPush } = this.props
    const { program } = this.state
    return {
      program,
      onCall,
      onPop,
      onPush
    }
  }

  _getPanel() {
    return {
      title: 'New Call',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _getPrograms() {
    const { programs, onProgram } = this.props
    const { program } = this.state
    return {
      program,
      programs,
      onChange: onProgram
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

  _handleBack() {
    this.props.onPop()
  }

  _handleSelect(selected) {
    return this.setState({ selected })
  }

}

export default Add
