import { Error, Stack } from 'maha-admin'
import Help from '../../components/help'
import PropTypes from 'prop-types'
import React from 'react'

class HelpRoot extends React.Component {

  static childContextTypes = {
    help: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any
  }

  state = {
    cards: [],
    open: false
  }

  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { open } = this.state
    return (
      <div className="maha-help">
        <div className="maha-help-main">
          { this.props.children }
        </div>
        { open &&
          <div className="maha-help-sidebar">
            <Error>
              <Stack { ...this._getStack() } />
            </Error>
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    this._handlePush(Help, {})
  }

  getChildContext() {
    return {
      help: {
        pop: this._handlePop,
        push: this._handlePush,
        toggle: this._handleToggle
      }
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
      cards:this.state.cards.slice(0, index)
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

  _handleToggle() {
    const { open } = this.state
    this.setState({
      open: !open
    })
  }

}

export default HelpRoot
