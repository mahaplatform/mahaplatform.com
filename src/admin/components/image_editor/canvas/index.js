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
                <img src={`/imagecache${asset.path}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
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
