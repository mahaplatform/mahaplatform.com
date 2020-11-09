import { Stack } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'
import Call from './call'

class CallContainer extends React.Component {

  static propTypes = {
    calls: PropTypes.array,
    programs: PropTypes.array
  }

  state = {
    cards: []
  }

  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)

  render() {
    return <Stack { ...this._getStack() } />
  }

  componentDidMount() {
    this._handlePush(Call, this._getCall.bind(this))
  }

  _getCall() {
    const { calls, programs } = this.props
    return {
      calls,
      programs,
      onPop: this._handlePop,
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

export default CallContainer
