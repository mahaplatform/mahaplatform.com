import { Attachments, Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Strategy from './strategy'
import Record from './record'
import React from 'react'
import _ from 'lodash'

class Chooser extends React.PureComponent {

  static propTypes = {
    cid: PropTypes.string,
    code: PropTypes.string,
    number: PropTypes.string,
    status: PropTypes.string,
    user: PropTypes.object,
    onCall: PropTypes.func,
    onCancel: PropTypes.func,
    onDone: PropTypes.func,
    onRecord: PropTypes.func,
    onSetStatus: PropTypes.func,
    onUpdateNumber: PropTypes.func
  }

  state = {
    cards: []
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleStrategy = this._handleStrategy.bind(this)

  render() {
    return <Stack { ...this._getStack() } />
  }

  componentDidMount() {
    this._handlePush(Strategy, this._getStrategy())
  }

  _getAttachments() {
    return {
      allow: {
        content_types: ['mpeg','mp3','wav','wave','x-wav','aiff','x-aifc','x-aiff','x-gsm','gsm','ulaw'].map(type => {
          return `audio/${type}`
        })
      },
      multiple: false,
      cancelText: <i className="fa fa-chevron-left" />,
      onCancel: this._handlePop,
      onDone: this._handleDone
    }
  }

  _getRecord() {
    const { cid, onCall, onRecord, onSetStatus, onUpdateNumber } = this.props
    return {
      cid,
      onBack: this._handlePop,
      onCall,
      onDone: this._handleDone,
      onRecord,
      onSetStatus,
      onUpdateNumber
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _getStrategy() {
    return {
      onCancel: this._handleCancel,
      onChoose: this._handleStrategy
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleDone(assets) {
    const asset = _.castArray(assets)[0]
    this.props.onDone(asset)
  }

  _handlePop(index = -1) {
    this.setState({
      cards:this.state.cards.slice(0, index)
    })
  }

  _handlePush(component, props) {
    this.setState({
      cards: [
        ...this.state.cards,
        { component, props }
      ]
    })
  }

  _handleStrategy(strategy) {
    if(strategy.value === 'upload') {
      this._handlePush(Attachments, this._getAttachments())
    } else if(strategy.value === 'record') {
      this._handlePush(Record, this._getRecord())
    }
  }

}

export default Chooser
