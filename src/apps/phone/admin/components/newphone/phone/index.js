import { Stack, Tasks } from '@admin'
import PropTypes from 'prop-types'
import Add from './add'
import React from 'react'
import Call from './call'

class Phone extends React.Component {

  static propTypes = {
    calls: PropTypes.array,
    programs: PropTypes.array,
    program: PropTypes.object,
    onCall: PropTypes.func,
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
        </div>
        { calls.length > 0 &&
          <div className="maha-phone-container-panel">
            <Call { ...this._getCall() } />
          </div>
        }
      </Tasks>
    )
  }

  componentDidMount() {
    this._handlePush(Phone, this._getPhone.bind(this))
  }

  _getPhone() {
    const { programs, program, onCall, onProgram } = this.props
    return {
      programs,
      program,
      onCall,
      onProgram,
      onPop: this._handlePop,
      onPush: this._handlePush
    }
  }

  _getCall() {
    const { program, calls } = this.props
    return {
      program,
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

export default Phone
