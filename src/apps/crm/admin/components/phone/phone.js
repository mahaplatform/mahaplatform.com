import { ModalPanel } from 'maha-admin'
import Voicemail from './voicemail'
import PropTypes from 'prop-types'
import Programs from './programs'
import Calls from './calls'
import React from 'react'
import SMS from './sms'
import Add from './add'
import _ from 'lodash'

class Phone extends React.Component {

  static contextTypes = {
    network: PropTypes.object,
    phone: PropTypes.object
  }

  static propTypes = {
    programs: PropTypes.array,
    program: PropTypes.object,
    onPop: PropTypes.func,
    onProgram: PropTypes.func,
    onPush: PropTypes.func
  }

  state = {
    receipts: {},
    selected: 0
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleCall = this._handleCall.bind(this)
  _handleClose = this._handleClose.bind(this)
  _handleFetch = this._handleFetch.bind(this)

  render() {
    const { program } = this.props
    const { selected } = this.state
    const tabs = this._getTabs()
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
                { tab.icon &&
                  <i className={`fa fa-${ tab.icon }`} />
                }
                { (tab.count !== undefined && tab.count > 0) &&
                  <div className="maha-phone-client-footer-item-count">
                    { tab.count }
                  </div>
                }
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
    this._handleFetch()
    this._handleJoin(program)
  }

  componentDidUpdate(prevProps) {
    const { program } = this.props
    if(!_.isEqual(program, prevProps.program)) {
      this._handleFetch()
      this._handleLeave(prevProps.program)
      this._handleJoin(program)
    }
  }

  componentWillUnmount() {
    const { program } = this.props
    this._handleLeave(program)
  }

  _getAdd() {
    const { programs, program, onPop, onPush } = this.props
    return {
      programs,
      program,
      onCall: this._handleCall,
      onPop,
      onPush
    }
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
    const { program, onPop, onPush } = this.props
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
      leftItems: [
        { icon: 'times', handler: this._handleClose }
      ],
      rightItems: [
        { icon: 'plus', handler: this._handleAdd }
      ]
    }
  }

  _getPrograms() {
    const { programs, program, onProgram } = this.props
    return {
      program,
      programs,
      onChange: onProgram
    }
  }

  _getTabs() {
    const { receipts } = this.state
    return [
      { icon: 'phone', label: 'Calls', component: Calls },
      { icon: 'comments', label: 'SMS', component: SMS, count: receipts.unread_messages },
      { icon: 'voicemail', label: 'Voicemail', component: Voicemail, count: receipts.unheard_voicemails }
    ]
  }

  _getTabPanel() {
    const { program, onPop } = this.props
    return {
      program,
      onPop
    }
  }

  _handleCall(call) {
    this.context.phone.call(call)
  }

  _handleClose() {
    this.context.phone.toggle()
  }

  _handleSelect(selected) {
    return this.setState({ selected })
  }

  _handleAdd() {
    this.props.onPush(Add, this._getAdd())
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
    const channel = `/admin/crm/programs/${program.id}/receipts`
    network.join(channel)
    network.subscribe([
      { target: channel, action: 'refresh', handler: this._handleFetch }
    ])
  }

  _handleLeave(program) {
    const { network } = this.context
    const channel = `/admin/crm/programs/${program.id}/receipts`
    network.leave(channel)
    network.unsubscribe([
      { target: channel, action: 'refresh', handler: this._handleFetch }
    ])
  }

}

export default Phone
