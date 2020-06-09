import { List, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class Call extends React.Component {

  static propTypes = {
    call: PropTypes.object,
    onPop: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <List { ...this._getList() } />
      </ModalPanel>
    )
  }

  _getTimestamp(call) {
    const today = moment().startOf('day')
    const yesterday = moment().subtract(1, 'day').startOf('day')
    const created_at = moment(call.created_at)
    if(today.format('YYMMDD') === created_at.format('YYMMDD')) return 'Today'
    if(yesterday.format('YYMMDD') === created_at.format('YYMMDD')) return 'Yesterday'
    if(today.diff(created_at, 'days') < 7) return created_at.format('dddd')
    return created_at.format('MM/DD/YY')
  }

  _getDuration(duration) {
    if(duration < 60) return `${duration} seconds`
    return `${Math.floor(duration / 60)} minutes`
  }

  _getList() {
    const { call } = this.props
    const items = [
      { label: 'Program', content: call.program.title },
      ...call.contact ? [
        { label: 'Contact', content: call.contact.full_name }
      ] : [],
      { label: 'Date', content: this._getTimestamp(call) },
      { label: 'Time', content: moment(call.created_at).format('h:mmA') },
      { label: 'Duration', content: this._getDuration(call.duration) },
      { label: 'Direction', content: call.direction }
    ]
    if(call.to) items.push({ label: 'From', content: call.from.formatted })
    if(call.from_user) items.push({ label: 'From', content: call.from_user.full_name })
    if(call.to) items.push({ label: 'To', content: call.to.formatted })
    if(call.to_user) items.push({ label: 'To', content: call.to_user.full_name })
    return { items }
  }

  _getPanel() {
    return {
      title: 'Call',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _handleBack() {
    this.props.onPop()
  }

}

export default Call
