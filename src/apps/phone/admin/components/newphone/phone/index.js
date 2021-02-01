import { ModalPanel } from '@admin'
import Voicemail from './voicemail'
import PropTypes from 'prop-types'
import Contacts from './contacts'
import Dialer from './dialer'
import Calls from './calls'
import Tabs from '../tabs'
import React from 'react'
import SMS from './sms'

class Phone extends React.Component {

  static contextTypes = {
    network: PropTypes.object,
    phone: PropTypes.object
  }

  static propTypes = {
    programs: PropTypes.array,
    program: PropTypes.object,
    onClose: PropTypes.func,
    onPop: PropTypes.func,
    onProgram: PropTypes.func,
    onPush: PropTypes.func
  }

  _handleClose = this._handleClose.bind(this)

  render() {
    if(!this.props.program) return null
    return (
      <ModalPanel { ...this._getPanel() }>
        <Tabs { ...this._getTabs() } />
      </ModalPanel>
    )
  }

  componentDidMount() {
    // const { program } = this.props
    // this._handleFetch()
    // this._handleJoin(program)
  }

  componentDidUpdate(prevProps) {
    // const { program } = this.props
    // if(!_.isEqual(program, prevProps.program)) {
    //   this._handleFetch()
    //   this._handleLeave(prevProps.program)
    //   this._handleJoin(program)
    // }
  }

  componentWillUnmount() {
    // const { program } = this.props
    // this._handleLeave(program)
  }

  _getPanel() {
    return {
      title: 'Phone',
      leftItems: [
        { icon: 'times', handler: this._handleClose, tooltip: {
          title: 'Close Phone',
          position: 'bottom left'
        } }
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
        { icon: 'phone', label: 'Calls', component: Calls, props: this._getProps.bind(this) },
        { icon: 'comments', label: 'SMS', component: SMS, props: this._getProps.bind(this) },
        { icon: 'user', label: 'Contacts', component: Contacts, props: this._getProps.bind(this) },
        { icon: 'th', label: 'Keypad', component: Dialer, props: this._getProps.bind(this) },
        { icon: 'voicemail', label: 'Voicemail', component: Voicemail, props: this._getProps.bind(this) }
      ],
      onProgram
    }
  }

  _handleClose() {
    this.props.onClose()
  }

  _handleFetch() {
    const { program } = this.props
    this.context.network.request({
      endpoint: `/api/admin/crm/programs/${program.id}/receipts`,
      method: 'GET',
      onSuccess: ({ data }) => {
        this.setState({
          receipts: data
        })
      }
    })
  }

  _handleJoin(program) {
    const { network } = this.context
    const target = `/admin/crm/programs/${program.id}/receipts`
    network.join(target)
    network.subscribe([
      { target, action: 'refresh', handler: this._handleFetch }
    ])
  }

  _handleLeave(program) {
    const { network } = this.context
    const target = `/admin/crm/programs/${program.id}/receipts`
    network.leave(target)
    network.unsubscribe([
      { target, action: 'refresh', handler: this._handleFetch }
    ])
  }

}

export default Phone
