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

  state = {
    start: null,
    offset: null
  }

  render() {
    const { asset } = this.props
    return (
      <div className="maha-imageeditor-canvas">
        <div className="maha-imageeditor-canvas-body">
          <div className="maha-imageeditor-canvas-viewport" style={ this._getViewportStyle() }>
            <div className="maha-imageeditor-canvas-flip" style={ this._getFlipStyle() }>
              <div className="maha-imageeditor-canvas-frame" style={ this._getFrameStyle() }>
                <img src={`/imagecache${asset.path}`} />
              </div>
            </div>
            <div className="maha-imageeditor-canvas-overlay" { ...this._getOverlay() } />
          </div>
        </div>
        <div className="maha-imageeditor-canvas-footer">
          <input { ...this._getRange() } />
        </div>
      </div>
    )
  }

  _getRange() {
    const { zoom } = this.state
    return {
      type: 'range',
      min: 0,
      max: 100,
      defaultValue: zoom,
      // onChange: this._handleZoom
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
    const { start } = this.state
    const offset = this.state.offset || { x: 0, y: 0 }
    const left = scaled.left - offset.x
    const top = scaled.top - offset.y
    const csstransforms = []
    if(left !== 0) csstransforms.push(`translateX(${0 - left}px)`)
    if(top !== 0 ) csstransforms.push(`translateY(${0 - top}px)`)
    if(scaled.height > viewport.height || scaled.width > viewport.width) {
      const xscale =  scaled.width / viewport.width
      const yscale =  scaled.height / viewport.height
      csstransforms.push(`scale(${xscale}, ${yscale})`)
    }
    return {
      transition: start == null ? 'transform 0.25s ease-in, width 0.25s ease-in, height 0.25s ease-in' : null,
      transform: csstransforms.join(' '),
      width: scaled.width,
      height: scaled.height
    }
  }

  _getOverlay() {
    return {
      draggable: true,
      onDragStart: this._handleDragStart.bind(this),
      onDrag: this._handleDrag.bind(this),
      onDragEnd: this._handleDragEnd.bind(this),
      onWheel: this._handleWheel.bind(this)
    }
  }

  _getDragImage() {
    var img = document.createElement('img')
    img.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
    return img
  }

  _handleDragStart(e) {
    e.dataTransfer.setDragImage(this._getDragImage(), 0, 0)
    this.setState({
      start: {
        x: e.clientX,
        y: e.clientY
      }
    })
  }

  _handleDrag(e) {
    const { start } = this.state
    this.setState({
      offset: {
        x: e.clientX - start.x,
        y: e.clientY - start.y
      }
    })
  }

  _handleDragEnd(e) {
    const { start, offset } = this.state
    const delta = {
      x: e.clientX - start.x,
      y: e.clientY - start.y
    }
    console.log('delta', delta)
    this.setState({
      start: null,
      offset: null
    })
  }

  _handleWheel(e) {
    if(e.deltaY < 0) console.log('zoom in')
    if(e.deltaY > 0) console.log('zoom out')
  }

}

export default Canvas
