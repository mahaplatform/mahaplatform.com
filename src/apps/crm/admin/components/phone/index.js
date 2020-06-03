import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Phone from './phone'
import React from 'react'

class PhoneContainer extends React.Component {

  static contextTypes = {}

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
    return <Stack { ...this._getStack() } />
  }

  componentDidMount() {
    this._handlePush(Phone, this._getPhone.bind(this))
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
