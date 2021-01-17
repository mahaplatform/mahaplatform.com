import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Canvas extends React.Component {

  static propTypes = {
    asset: PropTypes.object,
    crop: PropTypes.object,
    orientation: PropTypes.object,
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
    const { orientation } = this.props
    const { width, height } = this._getDimensions()
    const csstransforms = ['translate(-50%, -50%)']
    if(orientation.rot !== 0)  csstransforms.push(`rotate(${orientation.rot}deg)`)
    if(orientation.h > 0) csstransforms.push(`rotate3d(0,1,0,${orientation.h}deg)`)
    if(orientation.v > 0) csstransforms.push(`rotate3d(1,0,0,${orientation.v}deg)`)
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

  _getDimensions() {
    const { transforms } = this.props
    const viewport = this._getViewport()
    const scaled = this._getScaled()

    const frame = transforms.filter(transform => {
      return transform.key === 'rot'
    }).reduce((frame, transform) => ({
      width: frame.height,
      height: frame.width
    }), scaled)


    console.log({ scaled, frame })
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
    const { crop } = this.props
    const viewport = this._getViewport()
    const image = this._getImage()
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

  _getScaled() {
    const { crop, orientation } = this.props
    const canvas = this._getCanvas()
    const ratio = orientation.rot % 180 === 0 ? crop.ratio : (1 / crop.ratio)
    return {
      width: ratio > 1 ? canvas.width : (crop.width / crop.height) * canvas.height,
      height: ratio <= 1 ? canvas.height : (crop.height / crop.width) * canvas.width
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
    } else if(ratio <= 1) {
      return {
        width: canvas.height * ratio,
        height: canvas.height
      }
    }
    return scaled
  }

}

export default Canvas
