import Buttons from '../../buttons'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Canvas extends React.Component {

  static propTypes = {
    asset: PropTypes.object,
    canvas: PropTypes.object,
    crop: PropTypes.object,
    image: PropTypes.object,
    orientation: PropTypes.object,
    scaled: PropTypes.object,
    transforms: PropTypes.array,
    viewport: PropTypes.object,
    onRedo: PropTypes.func,
    onReset: PropTypes.func,
    onUndo: PropTypes.func
  }

  _handleRender = this._handleRender.bind(this)

  canvas = null

  render() {
    const { asset } = this.props
    return (
      <div className="maha-imageeditor-canvas">
        <div className="maha-imageeditor-canvas-header">
          <Buttons  { ...this._getButtons()} />
        </div>
        <div className="maha-imageeditor-canvas-body">
          <div className="maha-imageeditor-canvas-viewport" style={ this._getViewportStyle() }>
            <div className="maha-imageeditor-canvas-flip" style={ this._getFlipStyle() }>
              <div className="maha-imageeditor-canvas-frame" style={ this._getFrameStyle() }>
                <canvas ref={ node => this.canvas = node} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { asset } = this.props
    const { width, height } = asset.metadata
    this.canvas.width = width
    this.canvas.height = height
    this.ctx = this.canvas.getContext('2d')
    this.image = new Image()
    this.image.onload = this._handleRender
    this.image.src = `/imagecache${asset.path}`
  }

  _handleRender() {
    const { asset } = this.props
    const { width, height } = asset.metadata
    this.ctx.drawImage(this.image, 0, 0)
    const imagedata = this.ctx.getImageData(0, 0, width, height)
    const data = imagedata.data
    this._appleBrightness(data, 50)
    this.ctx.putImageData(imagedata, 0, 0)
  }

  _appleBrightness(data, amount) {
    const clamp = (value) => Math.max(Math.min(value, 255), 0)
    const bri = Math.floor(255 * (amount / 100))
    for (var i = 0; i < data.length; i+= 4) {
      data[i] = clamp(data[i] + bri)
      data[i+1] = clamp(data[i+1] + bri)
      data[i+2] = clamp(data[i+2] + bri)
    }
  }

  _applyContrast(data, amount) {
    const clamp = (value) => Math.max(Math.min(value, 255), 0)
    var con = (259.0 * (amount + 255.0)) / (255.0 * (259.0 - amount))
    for (var i = 0; i < data.length; i+= 4) {
      data[i] = clamp(con * (data[i] - 128.0) + 128.0)
      data[i+1] = clamp(con * (data[i+1] - 128.0) + 128.0)
      data[i+2] = clamp(con * (data[i+2] - 128.0) + 128.0)
    }
  }

  _getButtons() {
    const { transforms, undone, onRedo, onReset, onUndo } = this.props
    return {
      buttons: [
        {
          label: 'Reset',
          size: 'tiny',
          color: 'blue',
          disabled: transforms.length === 0,
          handler: onReset
        }, {
          label: 'Undo',
          size: 'tiny',
          color: 'blue',
          disabled: transforms.length === 0,
          handler: onUndo
        }, {
          label: 'Redo',
          size: 'tiny',
          color: 'blue',
          disabled: undone.length == 0,
          handler: onRedo
        }
      ]
    }
  }

  _getViewportStyle() {
    const { orientation, viewport } = this.props
    const { width, height } = viewport
    const csstransforms = ['translate(-50%, -50%)']
    if(orientation.rot !== 0)  csstransforms.push(`rotate(${orientation.rot}deg)`)
    return {
      transform: csstransforms.join(' '),
      width,
      height
    }
  }

  _getFlipStyle() {
    const { orientation } = this.props
    const csstransforms = []
    if(orientation.h !== 0) csstransforms.push(`rotate3d(0,1,0,${orientation.h}deg)`)
    if(orientation.v !== 0) csstransforms.push(`rotate3d(1,0,0,${orientation.v}deg)`)
    return {
      transform: csstransforms.join(' ')
    }
  }

  _getFrameStyle() {
    const { scaled, viewport } = this.props
    const csstransforms = []
    if(scaled.left !== 0) csstransforms.push(`translateX(${scaled.left}px)`)
    if(scaled.top !== 0 ) csstransforms.push(`translateY(${scaled.top}px)`)
    return {
      transform: csstransforms.join(' '),
      width: scaled.width,
      height: scaled.height
    }
  }

}

export default Canvas
