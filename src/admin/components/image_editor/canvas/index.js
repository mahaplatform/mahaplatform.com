import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Canvas extends React.Component {

  static propTypes = {
    asset: PropTypes.object,
    transforms: PropTypes.array
  }

  render() {
    const { asset } = this.props
    return (
      <div className="maha-imageeditor-canvas">
        <div className="maha-imageeditor-canvas-viewport" style={ this._getViewportStyle() }>
          <div className="maha-imageeditor-canvas-frame" style={ this._getFrameStyle() }>
            <img src={`/imagecache${asset.path}`} />
          </div>
        </div>
      </div>
    )
  }

  _getViewportStyle() {
    const { h, v, rot } = this._getOrientation()
    const { width, height } = this._getDimensions()
    console.log({ width, height })
    const csstransforms = ['translate(-50%, -50%)']
    if(rot > 0)  csstransforms.push(`rotate(${rot}deg)`)
    if(h > 0) csstransforms.push(`rotate3d(0,1,0,${h}deg)`)
    if(v > 0) csstransforms.push(`rotate3d(1,0,0,${v}deg)`)
    return {
      transform: csstransforms.join(' '),
      width,
      height
    }
  }

  _getFrameStyle() {
    const viewport = this._getViewport()
    const frame = this._getFrame()
    const csstransforms = []
    if(frame.top > 0 || frame.left> 0) {
      csstransforms.push(`translate(${0 - frame.left}px,${0 - frame.top}px)`)
    }
    if(frame.height > viewport.height || frame.width > viewport.width) {
      const xscale =  frame.width / viewport.width
      const yscale =  frame.height / viewport.height
      csstransforms.push(`scale(${xscale}, ${yscale})`)
    }
    return {
      transform: csstransforms.join(' ')
    }
  }

  _getCanvas() {
    return {
      width: 615,
      height: 615
    }
  }

  _getCrop() {
    const { asset, transforms } = this.props
    const index = _.findLastIndex(transforms, (transform) => {
      return transform.key === 'crop'
    })
    const crop = index >= 0 ? transforms[index].value : `0,0,${asset.width}.${asset.height}`
    const [ top, left, width, height ] = crop.split(',').map(value => parseInt(value))
    return { top, left, width, height }
  }

  _getDimensions() {
    const { transforms } = this.props
    const viewport = this._getViewport()
    const scaled = this._getScaled()
    console.log(scaled)
    const frame = transforms.filter(transform => {
      return transform.key === 'rot'
    }).reduce((frame, transform) => ({
      width: frame.height,
      height: frame.width
    }), scaled)
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

  _getFrame() {
    const viewport = this._getViewport()
    const image = this._getImage()
    const crop = this._getCrop()
    return {
      width: (image.width / crop.width) * viewport.width,
      height: (image.height / crop.height) * viewport.height,
      left: (crop.left / image.width) * viewport.width,
      top: (crop.top / image.height) * viewport.height
    }
  }

  _getImage() {
    const { asset } = this.props
    return asset.metadata
  }

  _getOrientation() {
    const { transforms } = this.props
    return transforms.filter(transform => {
      return _.includes(['rot','flip'], transform.key)
    }).reduce((state, transform) => {
      const { key, value } = transform
      const fliph = state.rot % 180 === 0 && value === 'h'
      return {
        ...state,
        ...key !== 'rot' ? {} : { rot: state.rot + value },
        ...key !== 'flip' ? {} : fliph ? { h: state.h + 180 } : { v: state.v + 180 }
      }
    }, { h: 0, v: 0, rot: 0 })
  }

  _getScaled() {
    const canvas = this._getCanvas()
    const image = this._getImage()
    const orientation = this._getOrientation()
    const ratio = orientation.rot % 180 === 0 ? image.width / image.height : image.height / image.width
    return {
      width: ratio > 1 ? canvas.width : (image.width / image.height) * canvas.height,
      height: ratio <= 1 ? canvas.height : (image.height / image.width) * canvas.width
    }
  }

  _getViewport() {
    const canvas = this._getCanvas()
    const scaled = this._getScaled()
    const ratio = scaled.width / scaled.height
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
    return scaled
  }

}

export default Canvas
