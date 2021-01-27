import { ModalPanel } from '@admin'
import PropTypes from 'prop-types'
import Contacts from './contacts'
import Dialer from './dialer'
import Users from './users'
import Tabs from '../tabs'
import React from 'react'

class Add extends React.Component {

  static contextTypes = {
    phone: PropTypes.object
  }

  static propTypes = {
    programs: PropTypes.array,
    program: PropTypes.object,
    onProgram: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)

  render() {
    if(!this.props.program) return null
    return (
      <ModalPanel { ...this._getPanel() }>
        <Tabs { ...this._getTabs() } />
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { program } = this.props
    this.setState({ program })
  }

  _getPanel() {
    return {
      title: 'New Call',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _getProps() {
    const { program, onPop, onPush } = this.props
    return {
      program,
      onPop,
      onPush
    }
  }

  _getTabs() {
    const { programs, program, onProgram } = this.props
    return {
      programs,
      program,
      tabs: [
        { icon: 'th', label: 'Keypad', component: Dialer, props: this._getProps.bind(this) },
        { icon: 'user', label: 'Contacts', component: Contacts, props: this._getProps.bind(this) },
        { icon: 'user-circle', label: 'Users', component: Users, props: this._getProps.bind(this) }
      ],
      onProgram
    }
  }

  _handleBack() {
    this.props.onPop()
  }

}

export default Add
