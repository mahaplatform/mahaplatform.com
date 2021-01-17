import PropTypes from 'prop-types'
import { adjust } from '../utils'
import React from 'react'
import _ from 'lodash'

class Canvas extends React.Component {

  static propTypes = {
    asset: PropTypes.object,
    canvas: PropTypes.object,
    crop: PropTypes.object,
    image: PropTypes.object,
    orientation: PropTypes.object,
    transforms: PropTypes.array
  }

  render() {
    const { asset } = this.props
    return (
      <div className="maha-imageeditor-canvas">
        <div className="maha-imageeditor-canvas-rotate" style={ this._getRotateStyle() }>
          <div className="maha-imageeditor-canvas-flip" style={ this._getFlipStyle() }>
            <div className="maha-imageeditor-canvas-frame" style={ this._getFrameStyle() }>
              <img src={`/imagecache${asset.path}`} />
            </div>
          </div>
          <div className="maha-imageeditor-canvas-overlay" />
        </div>
      </div>
    )
  }

  _getRotateStyle() {
    const { orientation } = this.props
    const { width, height } = this._getDimensions()
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
    if(orientation.h > 0) csstransforms.push(`rotate3d(0,1,0,${orientation.h}deg)`)
    if(orientation.v > 0) csstransforms.push(`rotate3d(1,0,0,${orientation.v}deg)`)
    return {
      transform: csstransforms.join(' ')
    }
  }

  _getFrameStyle() {
    const viewport = this._getViewport()
    const scaled = this._getScaled()
    const csstransforms = []
    if(scaled.left !== 0) csstransforms.push(`translateX(${0 - scaled.left}px)`)
    if(scaled.top !== 0 ) csstransforms.push(`translateY(${0 - scaled.top}px)`)
    if(scaled.height > viewport.height || scaled.width > viewport.width) {
      const xscale =  scaled.width / viewport.width
      const yscale =  scaled.height / viewport.height
      csstransforms.push(`scale(${xscale}, ${yscale})`)
    }
    // console.log({ viewport, scaled }, {
    //   transform: csstransforms.join(' '),
    //   width: scaled.width,
    //   height: scaled.height
    // })
    return {
      transform: csstransforms.join(' '),
      width: scaled.width,
      height: scaled.height
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
    // console.log({ viewport, scaled, frame })
    return adjust(frame, viewport)
  }

  _getScaled() {
    const { canvas, crop, image, orientation } = this.props
    const ratio = orientation.mode !== image.mode ? (1 / crop.ratio) : crop.ratio
    const scaled = {
      width: ratio > 1 ? canvas.width : (image.width / image.height) * canvas.height,
      height: ratio > 1 ? (image.height / image.width) * canvas.width : canvas.height
    }
    console.log({ crop, orientation, image, ratio, scaled })
    const scalar = {
      h: image.width / scaled.width,
      v: image.height / scaled.height,
    }
    return {
      ...scaled,
      left: crop.left * scalar.h,
      top: crop.top * scalar.v
    }
  }

  _getViewport() {
    const { canvas, crop } = this.props
    return {
      width: crop.ratio > 1 ? canvas.width : canvas.width * crop.ratio,
      height: crop.ratio > 1 ? canvas.height / crop.ratio : canvas.height
    }
  }

}

export default Canvas
