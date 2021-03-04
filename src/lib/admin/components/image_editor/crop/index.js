import Buttons from '../../buttons'
import PropTypes from 'prop-types'
import { fit } from '../utils'
import React from 'react'
import _ from 'lodash'

class Crop extends React.PureComponent {

  static propTypes = {
    asset: PropTypes.object,
    canvas: PropTypes.object,
    crop: PropTypes.object,
    image: PropTypes.object,
    orientation: PropTypes.object,
    ratio: PropTypes.number,
    transforms: PropTypes.array,
    onCrop: PropTypes.func,
    onPushTransform: PropTypes.func
  }

  state = {
    adjusted: null,
    drag: null,
    frame: null,
    offset: null,
    ready: false,
    start: null,
    viewport: null,
    zoom: 0
  }

  _handleDone = this._handleDone.bind(this)
  _handleMove = this._handleMove.bind(this)
  _handleMoveEnd = this._handleMoveEnd.bind(this)
  _handleMoveStart = this._handleMoveStart.bind(this)
  _handleWheel = this._handleWheel.bind(this)
  _handleZoom = this._handleZoom.bind(this)

  render() {
    const { asset } = this.props
    if(!this.state.ready) return null
    return (
      <div className="maha-imageeditor-crop">
        <div className="maha-imageeditor-crop-header">
          <Buttons  { ...this._getButtons()} />
        </div>
        <div className="maha-imageeditor-crop-body">
          <div className="maha-imageeditor-crop-viewport" style={ this._getViewportStyle() }>
            <div className="maha-imageeditor-crop-flip" style={ this._getFlipStyle() }>
              <div className="maha-imageeditor-crop-frame" style={ this._getFrameStyle() }>
                <img src={`/imagecache${asset.path}`} />
              </div>
            </div>
            <div className="maha-imageeditor-crop-overlay" { ...this._getOverlay() } />
          </div>
        </div>
        <div className="maha-imageeditor-crop-footer">
          <input { ...this._getRange() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    this._handleInit(true)
  }

  componentDidUpdate(prevProps, prevState) {
    const { zoom } = this.state
    const { ratio } = this.props
    if(ratio !== prevProps.ratio) {
      this._handleInit(true)
    }
    if(zoom !== prevState.zoom) {
      this._handleInit(false)
    }
  }

  _getButtons() {
    return {
      buttons: [
        {
          label: 'Done',
          size: 'tiny',
          color: 'red',
          handler: this._handleDone
        }
      ]
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

  _getOffset() {
    const { drag, offset } = this.state
    const { orientation } = this.props
    const rot = (360 + orientation.rot) % 360
    const x = offset.x + drag.x
    const y = offset.y + drag.y
    if(rot === 0) return { left: x, top: y }
    if(rot === 90)  return { left: y, top: -x }
    if(rot === 180) return { left: -x, top: -y }
    if(rot === 270)  return { left: -y, top: x }
  }

  _getFrameStyle() {
    const { frame, viewport, zoom } = this.state
    const { orientation } = this.props
    const csstransforms = []
    const offset = this._getOffset()
    const top = 0 - (frame.height / 2) + (viewport.height / 2) + offset.top
    const left = 0 - (frame.width / 2) + (viewport.width / 2) + offset.left
    if(top !== 0 ) csstransforms.push(`translateY(${top}px)`)
    if(left !== 0) csstransforms.push(`translateX(${left}px)`)
    if(zoom > 0) {
      const scale =  1 + (zoom / 5)
      csstransforms.push(`scale(${scale})`)
    }
    return {
      transform: csstransforms.join(' '),
      width: frame.width,
      height: frame.height
    }
  }

  _getOverlay() {
    return {
      draggable: true,
      onTouchStart: this._handleMoveStart,
      onTouchMove: this._handleMove,
      onTouchEnd: this._handleMoveEnd,
      onDragStart: this._handleMoveStart,
      onDrag: this._handleMove,
      onDragEnd: this._handleMoveEnd,
      onWheel: this._handleWheel
    }
  }

  _getRange() {
    const { zoom } = this.state
    return {
      type: 'range',
      min: 0,
      max: 10,
      value: zoom,
      onChange: this._handleZoom
    }
  }

  _getValue() {
    const { adjusted, offset, viewport } = this.state
    const { image } = this.props
    const unprojected = {
      left: (adjusted.width / 2) - (viewport.width / 2) - offset.x,
      top: (adjusted.height / 2) - (viewport.height / 2) - offset.y,
      width: viewport.width,
      height: viewport.height
    }
    const projectionscale = image.width / adjusted.width
    const crop = {
      left: Math.round(unprojected.left * projectionscale),
      top: Math.round(unprojected.top * projectionscale),
      width: Math.round(unprojected.width * projectionscale),
      height: Math.round(unprojected.height * projectionscale)
    }
    return [crop.left,crop.top,crop.width,crop.height].join(',')
  }

  _getViewport() {
    const { canvas, image } = this.props
    const ratio = this.props.ratio || (image.width / image.height)
    return {
      width: ratio > 1 ? canvas.width : canvas.width * ratio,
      height: ratio > 1 ? canvas.height / ratio : canvas.height
    }
  }

  _getViewportStyle() {
    const { viewport } = this.state
    const { orientation } = this.props
    const { width, height } = viewport
    const csstransforms = ['translate(-50%, -50%)']
    if(orientation.rot !== 0)  csstransforms.push(`rotate(${orientation.rot}deg)`)
    return {
      transform: csstransforms.join(' '),
      width,
      height
    }
  }

  _handleDone() {
    const value = this._getValue()
    this.props.onPushTransform('crop', value)
    this.props.onCrop(false)
  }

  _handleInit(reset) {
    const { canvas, image } = this.props
    const { zoom } = this.state
    const ratio = this.props.ratio || (image.width / image.height)
    const zoomscale = (zoom / 5) + 1
    const viewport = {
      width: ratio > 1 ? canvas.width : canvas.width * ratio,
      height: ratio > 1 ? canvas.height / ratio : canvas.height
    }
    const frame = fit(image, viewport)
    const adjusted = {
      width: frame.width * zoomscale,
      height: frame.height * zoomscale
    }
    this.setState({
      adjusted,
      frame,
      ready: true,
      viewport,
      ...reset ? {
        drag: { x: 0, y: 0 },
        offset: { x: 0, y: 0 },
        start: { x: 0, y: 0 },
        zoom: 0
      } : {}
    })
  }

  _handleMoveStart(e) {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    if(e.dataTransfer) {
      const dragImage = document.createElement('img')
      dragImage.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
      e.dataTransfer.setDragImage(dragImage, 0, 0)
    }
    this.setState({
      start: {
        x: clientX,
        y: clientY
      }
    })
  }

  _getBounds() {
    const { orientation } = this.props
    const rot = (360 + orientation.rot) % 180
    const { adjusted, offset, viewport } = this.state
    const left = 0 - (adjusted.width / 2) + (viewport.width / 2) - offset.x
    const top = 0 - (adjusted.height / 2) + (viewport.height / 2) - offset.y
    const right = (adjusted.width / 2) - (viewport.width / 2) - offset.x
    const bottom = (adjusted.height / 2) - (viewport.height / 2) - offset.y
    if(rot === 0) return { top, right, bottom, left }
    if(rot === 90) return { top: left, right: top, bottom: right, left: bottom }
  }

  _handleMove(e) {
    const { start } = this.state
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    if(clientX === 0) return
    const bounds = this._getBounds()
    this.setState({
      drag: {
        x: Math.max(Math.min(clientX - start.x, bounds.right), bounds.left),
        y: Math.max(Math.min(clientY - start.y, bounds.bottom), bounds.top)
      }
    })
  }

  _handleMoveEnd(e) {
    const { drag, offset } = this.state
    this.setState({
      start: { x: 0, y: 0 },
      drag: { x: 0, y: 0 },
      offset: {
        x: offset.x + drag.x,
        y: offset.y + drag.y
      }
    })
  }

  _handleWheel(e) {
    const { zoom } = this.state
    this.setState({
      zoom: Math.max(Math.min(zoom + (e.deltaY < 0 ? 1 : -1), 10), 0)
    })
  }

  _handleZoom(e) {
    this.setState({
      zoom: Math.floor(e.target.value)
    })
  }

}

export default Crop
