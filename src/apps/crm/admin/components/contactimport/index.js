import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Finalize from './finalize'
import Validate from './validate'
import Sources from './sources'
import Process from './process'
import React from 'react'

class ContactImport extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {}

  state = {
    cards: []
  }

  _handleDone = this._handleDone.bind(this)
  _handleFinalize = this._handleFinalize.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handleProcess = this._handleProcess.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleValidate = this._handleValidate.bind(this)

  render() {
    return (
      <div className="contactimport">
        <Stack { ...this._getStack() } />
      </div>
    )
  }

  componentDidMount() {
    this._handlePush(Sources, this._getSources())
  }

  _getFinalize(_import) {
    return {
      _import,
      onDone: this._handleValidate
    }
  }

  _getProcess(_import) {
    return {
      _import,
      onDone: this._handleDone
    }
  }

  _getSources() {
    return {
      onPop: this._handlePop,
      onDone: this._handleFinalize,
      onPush: this._handlePush
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _getValidate(_import) {
    return {
      _import: _import,
      onBack: this._handlePop,
      onDone: this._handleProcess
    }
  }

  _handleDone() {
    this.context.modal.close()
  }

  _handleFinalize(_import) {
    this._handlePush(Finalize, this._getFinalize(_import))
  }

  _handleProcess(_import) {
    this._handlePush(Process, this._getProcess(_import))
  }

  _handlePop(index = -1) {
    this.setState({
      cards: this.state.cards.slice(0, index)
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

  _handleValidate(_import) {
    this._handlePush(Validate, this._getValidate(_import))
  }

}

export default ContactImport
