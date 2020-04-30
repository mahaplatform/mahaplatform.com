import PropTypes from 'prop-types'
import { Stack } from 'maha-admin'
import Programs from './programs'
import Sources from './sources'
import React from 'react'

class EmailImport extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    contact: PropTypes.object,
    programs: PropTypes.object
  }

  state = {
    cards: []
  }

  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleSources = this._handleSources.bind(this)

  render() {
    return (
      <div className="contactimport">
        <Stack { ...this._getStack() } />
      </div>
    )
  }

  componentDidMount() {
    this._handlePush(Programs, this._getPrograms())
  }

  _getPrograms() {
    return {
      onCancel: this._handleCancel,
      onChoose: this._handleSources
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _getSources(program) {
    const { contact } = this.props
    return {
      contact,
      program,
      onPop: this._handlePop,
      onDone: this._handleOrganize,
      onPush: this._handlePush
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleDone() {
    this.context.modal.close()
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

  _handleSources(program) {
    this._handlePush(Sources, this._getSources(program))
  }

}

export default EmailImport
