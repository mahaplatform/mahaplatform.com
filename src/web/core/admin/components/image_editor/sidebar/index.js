import Tools from './tools'
import PropTypes from 'prop-types'
import Stack from '../../stack'
import React from 'react'

class Sidebar extends React.PureComponent {

  static propTypes = {
    asset: PropTypes.object,
    onAdjust: PropTypes.func,
    onCrop: PropTypes.func,
    onSetRatio: PropTypes.func
  }

  state = {
    cards: []
  }

  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)

  render() {
    return (
      <div className="maha-imageeditor-sidebar">
        <Stack { ...this._getStack() } />
      </div>
    )
  }

  componentDidMount() {
    this._handlePush(Tools, this._getTools())
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _getTools() {
    const { asset, onAdjust, onCrop, onSetRatio } = this.props
    return {
      asset,
      onAdjust,
      onPop: this._handlePop,
      onPush: this._handlePush,
      onCrop,
      onSetRatio
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

}

export default Sidebar
