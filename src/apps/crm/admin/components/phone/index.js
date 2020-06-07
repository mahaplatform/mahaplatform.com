import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Phone from './phone'
import React from 'react'
import Call from './call'

class PhoneContainer extends React.Component {

  static childContextTypes = {
    modal: PropTypes.object
  }

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
    const { calls } = this.props
    return (
      <div className="maha-phone-container">
        <Stack { ...this._getStack() } />
        { calls.length > 0 &&
          <Call { ...this._getCall() } />
        }
      </div>
    )

  }

  componentDidMount() {
    this._handlePush(Phone, this._getPhone.bind(this))
  }

  getChildContext() {
    return {
      modal: {
        open: this._handlePush,
        pop: this._handlePop,
        push: this._handlePush
      }
    }
  }

  _getCall() {
    const { calls } = this.props
    return {
      calls
    }
  }

  _getPhone() {
    const { programs } = this.props
    return {
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
