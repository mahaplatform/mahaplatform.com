import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Phone from './phone'
import React from 'react'
import Call from './call'

class PhoneContainer extends React.Component {

  static propTypes = {
    call: PropTypes.object,
    programs: PropTypes.array
  }

  state = {
    cards: []
  }

  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)

  render() {
    const { call } = this.props
    return (
      <div className="maha-phone-container">
        <Stack { ...this._getStack() } />
        { call &&
          <Call { ...this._getCall() } />
        }
      </div>
    )

  }

  componentDidMount() {
    this._handlePush(Phone, this._getPhone.bind(this))
  }

  _getCall() {
    const { call } = this.props
    return {
      call
    }
  }

  _getPhone() {
    const { call, programs } = this.props
    return {
      call,
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

export default PhoneContainer
