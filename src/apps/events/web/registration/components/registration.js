import { Stack } from 'maha-client'
import PropTypes from 'prop-types'
import Tickets from './tickets'
import Summary from './summary'
import React from 'react'

class Registration extends React.Component {

  static propTypes = {
    event: PropTypes.object
  }

  state = {
    cards: []
  }

  render() {
    const { event } = this.props
    return (
      <div className="registration">
        <div className="registration-main">
          <Stack { ...this._getStack() } />
        </div>
        <div className="registration-sidebar">
          { event.image &&
            <div className="registration-sidebar-image">
              <img src="https://dev.mahaplatform.com:8080/imagecache/fit=cover&w=350&h=175/assets/8346/10156387003857338.jpg" />
            </div>
          }
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
    const { event } = this.props
    return {
      event
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

export default Registration
