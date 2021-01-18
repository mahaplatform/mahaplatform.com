import Tools from './tools'
import PropTypes from 'prop-types'
import Stack from '../../stack'
import React from 'react'

class Sidebar extends React.PureComponent {

  static propTypes = {
    asset: PropTypes.object,
    canvas: PropTypes.object,
    cropping: PropTypes.bool,
    crop: PropTypes.object,
    image: PropTypes.object,
    orientation: PropTypes.object,
    ratio: PropTypes.number,
    transforms: PropTypes.array,
    onCrop: PropTypes.func,
    onPopTransform: PropTypes.func,
    onPushTransform: PropTypes.func,
    onSetRatio: PropTypes.func
  }

  state = {
    cards: []
  }

  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleTool = this._handleTool.bind(this)

  render() {
    return (
      <div className="maha-imageeditor-sidebar">
        <Stack { ...this._getStack() } />
      </div>
    )
  }

  componentDidMount() {
    this._handlePush(Tools, this._getTools.bind(this))
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _getTool(tool) {
    const { asset, canvas, crop, cropping, image, orientation, ratio, transforms, onCrop, onPopTransform, onPushTransform, onSetRatio } = this.props
    return {
      asset,
      canvas,
      crop,
      cropping,
      image,
      orientation,
      ratio,
      transforms,
      onCrop,
      onPopTransform,
      onPushTransform,
      onBack: this._handlePop,
      onSetRatio
    }
  }

  _getTools() {
    return {
      onChoose: this._handleTool
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

  _handleTool(tool) {
    this._handlePush(tool.component, this._getTool.bind(this, tool))
  }

}

export default Sidebar
