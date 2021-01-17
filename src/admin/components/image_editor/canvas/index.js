import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Canvas extends React.Component {

  static propTypes = {
    asset: PropTypes.object,
    ratio: PropTypes.number,
    transforms: PropTypes.array
  }

  canvas = null
  padding = 18
  panel = null

  state = {
    panel: null,
    frame: null
  }

  render() {
    const { asset } = this.props
    return (
      <div className="maha-imageeditor-canvas">
        <div className="maha-imageeditor-canvas-orientation" style={ this._getOrientationStyle() }>
          <div className="maha-imageeditor-canvas-viewport">
            <div className="maha-imageeditor-canvas-frame" style={ this._getFrameStyle() }>
              <img src={`/imagecache${asset.path}`} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  _getOrientationStyle() {
    return {
      transform: [
        'translate(-50%, -50%)',
        ...this._getOrientation()
      ].join(' '),
      ...this._getDimensions()
    }
  }

  _getFrame() {
    const viewport = this._getViewport()
    const { asset } = this.props
    const crop = this._getCrop()
    const { width, height } = asset.metadata
    return {
      width: (width / crop.width) * viewport.width,
      height: (height / crop.height) * viewport.height,
      left: (crop.left / width) * viewport.width,
      top: (crop.top / height) * viewport.height
    }
  }

  _getFrameStyle() {
    const viewport = this._getViewport()
    const frame = this._getFrame()
    return {
      top: 0 - frame.top,
      left: 0 - frame.left,
      bottom: viewport.height + frame.top - frame.height,
      right: viewport.width + frame.left - frame.width
    }
  }

  _getCanvas() {
    return {
      width: 635,
      height: 660
    }
  }

  _getCrop() {
    const { asset, ratio, transforms } = this.props
    const crop = transforms.filter(transform => {
      return transform.key === 'crop'
    }).reduce((frame, transform) => {
      return transform.value
    }, `0,0,${asset.width}.${asset.height}`)
    const [ top, left, width, height ] = crop.split(',').map(value => parseInt(value))
    return { top, left, width, height }
  }

  _getAdjusted = (frame) => {
    const viewport = this._getViewport()
    if(viewport.width > viewport.height) {
      if((viewport.height / viewport.width) * frame.width > frame.height) {
        return {
          width: (viewport.width / viewport.height) * frame.height,
          height: frame.height
        }
      } else {
        return {
          width: frame.width,
          height: (viewport.height / viewport.width) * frame.width
        }
      }
    } else {
      if((viewport.width / viewport.height) * frame.height > frame.width) {
        return {
          width: frame.width,
          height: (viewport.height / viewport.width) * frame.width
        }
      } else {
        return {
          width: (viewport.width / viewport.height) * frame.height,
          height: frame.height
        }
      }
    }
  }

  _getViewport = () => {
    const canvas = this._getCanvas()
    const { ratio } = this.props
    if(ratio > 1) {
      return {
        width: canvas.width,
        height: canvas.width / ratio
      }
    }
    if(ratio <= 1) {
      return {
        width: canvas.height * ratio,
        height: canvas.height
      }
    }
    return canvas
  }

  _getDimensions() {
    const { asset, ratio, transforms } = this.props
    const canvas = this._getCanvas()
    const frame = transforms.filter(transform => {
      return transform.key === 'rot'
    }).reduce((frame, transform) => ({
      width: frame.height,
      height: frame.width
    }), canvas)
    return this._getAdjusted(frame)
  }

  _getOrientation() {
    const { transforms } = this.props
    const csstransforms = transforms.filter(transform => {
      return _.includes(['rot','flip'], transform.key)
    }).reduce((state, transform) => {
      if(transform.key === 'rot') {
        return {
          axis: state.axis + transform.value,
          transforms: [
            ...state.transforms,
            `rotate(${transform.value}deg)`
          ]
        }
      }
      if(transform.key === 'flip') {
        return {
          axis: state.axis,
          transforms: [
            ...state.transforms,
            state.axis % 180 === 0 && transform.value === 'h' ? 'rotate3d(0,1,0,180deg)' : 'rotate3d(1,0,0,180deg)'
          ]
        }
      }
    }, { axis: 0, transforms: [] })
    return csstransforms.transforms
  }

}

export default Canvas
