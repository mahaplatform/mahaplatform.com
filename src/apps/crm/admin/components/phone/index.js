import { Stack, Tasks } from '@admin'
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
    program: null,
    cards: []
  }

  _handlePop = this._handlePop.bind(this)
  _handleProgram = this._handleProgram.bind(this)
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
    const { programs } = this.props
    this.setState({
      program: programs[0]
    })
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
    const { calls, programs } = this.props
    return {
      calls,
      programs
    }
  }

  _getPhone() {
    const { programs } = this.props
    const { program } = this.state
    return {
      key: `program_${program.id}`,
      programs,
      program,
      onPop: this._handlePop,
      onProgram: this._handleProgram,
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

  _handleProgram(program) {
    this.setState({ program })
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
