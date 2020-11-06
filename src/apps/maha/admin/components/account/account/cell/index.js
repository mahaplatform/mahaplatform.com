import Authorize from './authorize'
import PropTypes from 'prop-types'
import { Stack } from '@admin'
import Complete from './complete'
import Verify from './verify'
import React from 'react'

class Cell extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  state = {
    cards: []
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleComplete = this._handleComplete.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)
  _handleVerify = this._handleVerify.bind(this)

  render() {
    return <Stack { ...this._getStack() } />
  }

  componentDidMount() {
    this._handlePush(Authorize, this._getAuthorize())
  }

  _getAuthorize() {
    return {
      onNext: this._handleVerify
    }
  }

  _getComplete() {
    return {
      onDone: this._handleDone
    }
  }

  _getPanel() {
    return {
      title: 'Cell'
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _getVerify() {
    return {
      onCancel: this._handleCancel,
      onNext: this._handleComplete
    }
  }

  _handleCancel() {
    this.context.modal.pop()
  }

  _handleComplete() {
    this._handlePush(Complete, this._getComplete())
  }

  _handleDone() {
    this.context.modal.close()
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

  _handleSuccess() {
    this.context.modal.pop()
  }

  _handleVerify() {
    this._handlePush(Verify, this._getVerify())
  }

}

export default Cell
