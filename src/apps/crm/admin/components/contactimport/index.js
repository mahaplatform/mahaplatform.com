import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Organize from './organize'
import Summary from './summary'
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
  _handleOrganize = this._handleOrganize.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handleProcess = this._handleProcess.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleSummary = this._handleSummary.bind(this)

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

  _getOrganize(_import) {
    return {
      _import,
      onDone: this._handleSummary
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
      onDone: this._handleOrganize,
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

  _getSummary(_import) {
    return {
      _import: _import,
      onBack: this._handlePop,
      onDone: this._handleProcess
    }
  }

  _handleDone() {
    this.context.modal.close()
  }

  _handleOrganize(_import) {
    this._handlePush(Organize, this._getOrganize(_import))
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

  _handleSummary(_import) {
    this._handlePush(Summary, this._getSummary(_import))
  }

}

export default ContactImport
