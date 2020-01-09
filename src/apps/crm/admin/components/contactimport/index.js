import Configure from './configure'
import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Sources from './sources'
import React from 'react'

class ContactImport extends React.PureComponent {

  static propTypes = {
  }

  static defaultProps = {}

  state = {
    cards: []
  }

  _handleConfigure = this._handleConfigure.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handlePop = this._handlePop.bind(this)

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

  _getConfigure() {
    return {
      onPop: this._handlePop,
      onPush: this._handlePush
    }
  }

  _getSources() {
    return {
      onPop: this._handlePop,
      onDone: this._handleConfigure,
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

  _handleConfigure(_import) {
    console.log('import', _import)
    this._handlePush(Configure, this._getConfigure())
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

}

export default ContactImport
