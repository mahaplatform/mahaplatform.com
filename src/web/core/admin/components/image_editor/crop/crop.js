import PropTypes from 'prop-types'
import React from 'react'

class Crop extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    asset: PropTypes.object,
    drift: PropTypes.object,
    origin: PropTypes.object,
    ratio: PropTypes.number,
    transforms: PropTypes.object,
    width: PropTypes.number,
    zoom: PropTypes.number,
    onMoving: PropTypes.func,
    onMove: PropTypes.func,
    onZoom: PropTypes.func
  }

  scale = 5

  state = {
    origin: null,
    drift: { x: 0, y: 0 },
    image: { w: 630, h: 354 },
    window: { w: 664, h: 691 },
    zoom: 0
  }

  static defaultProps = {}

  _handleWheel = this._handleWheel.bind(this)
  _handleZoom = this._handleZoom.bind(this)
  _handleMouseDown = this._handleMouseDown.bind(this)
  _handleMouseMove = this._handleMouseMove.bind(this)
  _handleMouseUp = this._handleMouseUp.bind(this)

  render() {
    const { asset } = this.props
    return (
      <div className="maha-imageeditor-crop">
        <div className="maha-imageeditor-crop-body" { ...this._getBody() }>
          <img src={`/imagecache/w=630${asset.path}`} style={ this._getImageStyle() } />
          <div className="maha-imageeditor-crop-frame" { ...this._getFrame() } />
        </div>
        <div className="maha-imageeditor-crop-footer">
          <input { ...this._getRange() } />
        </div>
      </div>
    )
  }

  _getBody() {
    return {
      onMouseMove: this._handleMouseMove,
      onMouseUp: this._handleMouseUp,
      onWheel: this._handleWheel
    }
  }

  _getFrame() {
    return {
      style: this._getFrameStyle(),
      onMouseDown: this._handleMouseDown
    }
  }

  _getFrameStyle() {
    const { image, window } = this.state
    const { ratio } = this.props
    const width = image.w > image.h ? ratio * image.h : image.h
    const height = image.w > image.h ? image.h : ratio * image.w
    return {
      top: (window.h - height) / 2 + 1,
      left: (window.w - width) / 2 + 1,
      width,
      height
    }
  }

  _getImageStyle() {
    const { zoom, drift, image, window } = this.state
    return {
      width: image.w + (this.scale * zoom),
      height: image.h + (this.scale * zoom),
      top: ((window.h - image.h) / 2) - ((this.scale * zoom) / 2) + drift.y,
      left: ((window.w - image.w) / 2) - ((this.scale * zoom) / 2) + drift.x
    }
  }

  _getRange() {
    const { zoom } = this.state
    return {
      type: 'range',
      min: 0,
      max: 100,
      defaultValue: zoom,
      onChange: this._handleZoom
    }
  }

  _handleMouseDown(e) {
    this.setState({
      origin: {
        x: e.screenX,
        y: e.screenY
      }
    })
  }

  _handleMouseUp(e) {
    const { origin } = this.state
    if(origin === null) return
    this.setState({
      origin: null
    })
  }

  _handleMouseMove(e) {
    const { origin, zoom } = this.state
    if(origin === null) return
    this._handleUpdate({
      x: e.screenX - origin.x,
      y: e.screenY - origin.y
    }, zoom)
  }

  _handleWheel(e) {
    const { drift, zoom } = this.state
    this._handleUpdate(drift, zoom - e.movementY)
  }

  _handleZoom(e) {
    const { drift } = this.state
    this._handleUpdate(drift, e.target.value)
  }

  _handleUpdate(drift, zoom) {
    this.setState({
      drift: {
        x: drift.x,
        y: drift.y
      },
      zoom: Math.max(0, zoom)
    })
  }

}

export default Crop
