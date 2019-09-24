import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Crop extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    asset: PropTypes.object,
    ratio: PropTypes.number,
    transforms: PropTypes.object,
    onAdjust: PropTypes.func
  }

  panel = null
  image = null
  scale = 5

  state = {
    dragging: false,
    natural: null,
    image: null,
    origin: null,
    panel: null,
    zoom: 0
  }

  static defaultProps = {}

  _handleInit = this._handleInit.bind(this)
  _handleChange = _.debounce(this._handleChange.bind(this), 250, { trailing: true })
  _handleDrag = this._handleDrag.bind(this)
  _handleDragStart = this._handleDragStart.bind(this)
  _handleDragStop = this._handleDragStop.bind(this)
  _handleUpdate = _.throttle(this._handleUpdate.bind(this), 50)
  _handleWheel = this._handleWheel.bind(this)
  _handleZoom = this._handleZoom.bind(this)

  render() {
    const { asset } = this.props
    return (
      <div className="maha-imageeditor-crop" ref={ node => this.panel = node }>
        <div className="maha-imageeditor-crop-body" { ...this._getBody() }>
          <img src={`/imagecache/w=630${asset.path}`} style={ this._getImageStyle() } ref={ node => this.image = node } onLoad={ this._handleInit } />
          <div className="maha-imageeditor-crop-frame" { ...this._getFrame() } />
        </div>
        <div className="maha-imageeditor-crop-footer">
          <input { ...this._getRange() } />
        </div>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { zoom, image } = this.state
    const { ratio } = this.props
    if(ratio !== prevProps.ratio) {
      this._handleInit()
    } else if(zoom !== prevState.zoom) {
      this._handleChange()
    } else if(!_.isEqual(image, prevState.image)) {
      this._handleChange()
    }
  }

  _getBody() {
    return {
      onMouseLeave: this._handleDragStop,
      onMouseMove: this._handleDrag,
      onMouseUp: this._handleDragStop,
      onWheel: this._handleWheel
    }
  }

  _getFrame() {
    return {
      style: this._getFrameStyle(),
      onMouseDown: this._handleDragStart
    }
  }

  _getFrameStyle() {
    const { image, frame } = this.state
    if(!image) return {}
    return {
      left: frame.x,
      top: frame.y,
      width: frame.w,
      height: frame.h
    }
  }

  _getImageStyle() {
    const { zoom, image, panel } = this.state
    if(!image) return { width: '100%' }
    return {
      top: ((panel.h - image.h) / 2) - ((this.scale * zoom) / 2) + image.y,
      left: ((panel.w - image.w) / 2) - ((this.scale * zoom) / 2) + image.x,
      width: image.w + (this.scale * zoom),
      height: image.h + (this.scale * zoom)
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

  _handleChange() {
    const { image, frame } = this.state
    this.props.onAdjust('crop', [
      Math.floor(image.w),
      Math.floor(image.h),
      Math.floor((image.w / 2) - (frame.w / 2) - image.x),
      Math.floor((image.h / 2) - (frame.h / 2) - image.y)
    ])
  }

  _handleDragStart(e) {
    const { image } = this.state
    this.setState({
      dragging: true,
      origin: {
        x: e.screenX - image.x,
        y: e.screenY - image.y
      }
    })
  }

  _handleDragStop(e) {
    const { dragging } = this.state
    if(!dragging) return
    this.setState({
      dragging: false
    })
  }

  _handleDrag(e) {
    const { dragging, origin, zoom } = this.state
    if(!dragging) return
    this._handleUpdate({
      x: e.screenX - origin.x,
      y: e.screenY - origin.y
    }, zoom)
  }

  _handleInit() {
    const { clientWidth, clientHeight, naturalWidth, naturalHeight } = this.image
    const { offsetWidth, offsetHeight } = this.panel
    const { ratio } = this.props
    const image = { x: 0, y: 0, w: clientWidth, h: clientHeight }
    const natural = { w: naturalWidth, h: naturalHeight }
    const panel = { x: 0, y: 0, w: offsetWidth, h: offsetHeight }
    const frame = {
      w: image.w > image.h ? ratio * image.h : image.h,
      h: image.w > image.h ? image.h : ratio * image.w
    }
    frame.x = (panel.w - frame.w) / 2 + 1,
    frame.y = (panel.h - frame.h) / 2 + 1,
    this.setState({
      frame,
      natural,
      image,
      panel
    })
  }

  _handleWheel(e) {
    const { image, zoom } = this.state
    this._handleUpdate(image, zoom - e.movementY)
  }

  _handleZoom(e) {
    const { image } = this.state
    this._handleUpdate(image, e.target.value)
  }

  _handleUpdate(newimage, newzoom) {
    const { frame, image } = this.state
    const min = {
      x: (frame.w / 2) - (image.w / 2),
      y: -1 * (newzoom * this.scale) / 2
    }
    const max = {
      x: (image.w / 2) - (frame.w / 2),
      y: (newzoom * this.scale) / 2
    }
    this.setState({
      image: {
        ...this.state.image,
        x: Math.max(min.x, Math.min(max.x, newimage.x)),
        y: Math.max(min.y, Math.min(max.y, newimage.y))
      },
      zoom: Math.max(0, newzoom)
    })
  }

}

export default Crop
