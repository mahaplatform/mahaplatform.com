import StrategyToken from './strategy_token'
import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import List from '../list'
import React from 'react'

class Strategy extends React.PureComponent {

  static propTypes = {
    onCancel: PropTypes.func,
    onChoose: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChoose = this._handleChoose.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <List { ...this._getList() } />
      </ModalPanel>
    )
  }

  _getList() {
    const strategies = [
      { icon: 'hdd-o', value: 'upload', text: 'Choose audio file' },
      { icon: 'microphone', value: 'record', text: 'Call me to record the message' }
    ]
    return {
      format: StrategyToken,
      items: strategies,
      handler: this._handleChoose
    }
  }

  _getPanel() {
    return {
      title: 'Choose Strategy',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ]
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChoose(strategy) {
    this.props.onChoose(strategy)
  }

}

export default Strategy
