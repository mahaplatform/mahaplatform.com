import { Stack, Tasks } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'
import Phone from './phone'
import Call from './call'

class Handset extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    programs: PropTypes.array,
    program: PropTypes.object,
    calls: PropTypes.array,
    error: PropTypes.string,
    onClose: PropTypes.func,
    onProgram: PropTypes.func
  }

  state = {
    cards: []
  }

  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)

  render() {
    const { calls } = this.props
    return (
      <Tasks>
        <div className="maha-phone-container">
          <div className="maha-phone-container-panel">
            <Stack { ...this._getStack() } />
          </div>
          { calls.length > 0 &&
            <div className="maha-phone-container-panel">
              <Call { ...this._getCall() } />
            </div>
          }
        </div>
      </Tasks>
    )
  }

  componentDidMount() {
    this._handlePush(Phone, this._getPhone.bind(this))
  }

  _getPhone() {
    const { program, programs, onClose, onProgram } = this.props
    return {
      program,
      programs,
      onClose,
      onProgram,
      onPop: this._handlePop,
      onPush: this._handlePush
    }
  }

  _getCall() {
    const { calls } = this.props
    return {
      calls
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

export default Handset
