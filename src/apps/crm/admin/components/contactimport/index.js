import { Container, Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Organize from './organize'
import Complete from './complete'
import Summary from './summary'
import Sources from './sources'
import Process from './process'
import Intro from './intro'
import React from 'react'

class ContactImport extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    imports: PropTypes.array
  }

  state = {
    cards: []
  }

  _handleComplete = this._handleComplete.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleIntro = this._handleIntro.bind(this)
  _handleOrganize = this._handleOrganize.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handleProcess = this._handleProcess.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleResume = this._handleResume.bind(this)
  _handleSources = this._handleSources.bind(this)
  _handleSummary = this._handleSummary.bind(this)

  render() {
    return (
      <div className="contactimport">
        <Stack { ...this._getStack() } />
      </div>
    )
  }

  componentDidMount() {
    const { imports } = this.props
    if(imports.length === 0) return this._handleSources()
    this._handleIntro()
  }

  _getComplete() {
    return {
      onDone: this._handleDone
    }
  }

  _getIntro() {
    return {
      onNew: this._handleSources,
      onResume: this._handleResume
    }
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
      onDone: this._handleComplete
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
      onDone: this._handleProcess,
      onPop: this._handlePop,
      onPush: this._handlePush
    }
  }

  _handleComplete() {
    this._handlePush(Complete, this._getComplete())
  }

  _handleDone() {
    this.context.modal.close()
  }

  _handleIntro() {
    this._handlePush(Intro, this._getIntro())
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

  _handleResume(_import) {
    this._handlePush(Summary, this._getSummary(_import))
  }

  _handleSources() {
    this._handlePush(Sources, this._getSources())
  }

  _handleSummary(_import) {
    this._handlePush(Summary, this._getSummary(_import))
  }

}

const mapResources = (props, context) => ({
  imports: {
    endpoint: '/api/admin/imports',
    query: {
      $filter: {
        object_type: {
          $eq: 'crm_contacts'
        },
        stage: {
          $neq: 'complete'
        }
      }
    }
  }
})

export default Container(mapResources)(ContactImport)
