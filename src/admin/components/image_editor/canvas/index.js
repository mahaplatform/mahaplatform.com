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
    viewport: PropTypes.object
  }

  render() {
    const { asset } = this.props
    return (
      <div className="maha-imageeditor-canvas">
        <div className="maha-imageeditor-canvas-viewport" style={ this._getViewportStyle() }>
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
    if(scaled.left !== 0) csstransforms.push(`translateX(${0 - scaled.left}px)`)
    if(scaled.top !== 0 ) csstransforms.push(`translateY(${0 - scaled.top}px)`)
    if(scaled.height > viewport.height || scaled.width > viewport.width) {
      const xscale =  scaled.width / viewport.width
      const yscale =  scaled.height / viewport.height
      csstransforms.push(`scale(${xscale}, ${yscale})`)
    }
    return {
      transform: csstransforms.join(' '),
      width: scaled.width,
      height: scaled.height
    }
  }

}

export default Canvas
