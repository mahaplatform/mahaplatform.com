import Validating from './validating'
import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Sources from './sources'
import React from 'react'

class ContactImport extends React.PureComponent {

  static propTypes = {
  }

  state = {
    cards: []
  }

  _handlePush = this._handlePush.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handleValidating = this._handleValidating.bind(this)

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

  _getSources() {
    return {
      onPop: this._handlePop,
      onDone: this._handleValidating,
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

  _getValidating() {

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

  _handleValidating() {
    this._handlePush(Validating, this._getValidating())
  }

}

export default ContactImport
