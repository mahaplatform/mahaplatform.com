import { Stack } from 'maha-client'
import PropTypes from 'prop-types'
import Tickets from './tickets'
import Summary from './summary'
import React from 'react'

class Registration extends React.Component {

  static propTypes = {}

  state = {
    cards: []
  }

  render() {
    return (
      <div className="registration">
        <div className="registration-main">
          <Stack { ...this._getStack() } />
        </div>
        <div className="registration-sidebar">
          <Summary { ...this._getSummary() }/>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this._handlePush(Tickets, this._getTickets())
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _getSummary() {
    return {}
  }

  _getTickets() {
    return {}
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

export default Registration
