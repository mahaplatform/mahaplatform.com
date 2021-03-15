import PropTypes from 'prop-types'
import { Stack } from '@admin'
import Type from './type'
import React from 'react'

class NewDomain extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  state = {
    domain: {},
    cards: []
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Stack { ...this._getStack() } />
  }

  componentDidMount() {
    this._handlePush(Type, this._getType())
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

  _getType() {
    return {
      onNext: this._handle
    }
  }
  _handleCancel() {
    this.context.modal.pop()
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

}

export default NewDomain
