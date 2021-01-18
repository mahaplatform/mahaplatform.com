import Buttons from '../../buttons'
import PropTypes from 'prop-types'
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
    onCrop: PropTypes.func
  }

  state = {
    drag: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
    start: { x: 0, y: 0 },
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

  componentDidUpdate(prevProps) {
    const { ratio } = this.props
    if(ratio !== prevProps.ratio) {}
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

  _getOffset(drag, offset) {
    const { orientation } = this.props
    const rot = (360 + orientation.rot) % 360
    if(rot === 0) {
      return {
        left: (offset.x + drag.x),
        top: (offset.y + drag.y)
      }
    }
    if(rot === 90) {
      return {
        left: (offset.y + drag.y),
        top: (offset.x - drag.x)
      }
    }
    if(rot === 180) {
      return {
        left: (offset.x - drag.x),
        top: (offset.y - drag.y)
      }
    }
    if(rot === 270) {
      return {
        left: (offset.y - drag.y),
        top: (offset.x + drag.x)
      }
    }

  }

  _getFrame() {
    const viewport = this._getViewport()
    const { image } = this.props
    return {
      width: image.mode === 'portrait' ? viewport.width : (image.width / image.height) * viewport.height,
      height: image.mode === 'portrait' ? (image.height / image.width) * viewport.width : viewport.height
    }
  }

  _getFrameStyle() {
    const { drag, offset, zoom } = this.state
    const { orientation } = this.props
    const frame = this._getFrame()
    const csstransforms = []
    const { left, top } = this._getOffset(drag, offset)
    if(left !== 0) csstransforms.push(`translateX(${left}px)`)
    if(top !== 0 ) csstransforms.push(`translateY(${top}px)`)
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

  _getViewport() {
    const { canvas, image } = this.props
    const ratio = this.props.ratio || (image.width / image.height)
    return {
      width: ratio > 1 ? canvas.width : canvas.width * ratio,
      height: ratio > 1 ? canvas.height / ratio : canvas.height
    }
  }

  _getViewportStyle() {
    const { orientation } = this.props
    const { width, height } = this._getViewport()
    const csstransforms = ['translate(-50%, -50%)']
    if(orientation.rot !== 0)  csstransforms.push(`rotate(${orientation.rot}deg)`)
    return {
      transform: csstransforms.join(' '),
      width,
      height
    }
  }

  _handleDone() {
    this.props.onCrop(false)
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

  _handleMove(e) {
    const { start } = this.state
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    if(clientX === 0) return
    this.setState({
      drag: {
        x: clientX - start.x,
        y: clientY - start.y
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
