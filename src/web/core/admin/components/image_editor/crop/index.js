import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Crop extends React.PureComponent {

  static propTypes = {
    asset: PropTypes.object,
    ratio: PropTypes.number,
    transforms: PropTypes.object,
    onAdjust: PropTypes.func
  }

  padding = 20
  panel = null
  image = null
  scale = 5

  state = {
    dragging: false,
    natural: null,
    image: null,
    offset: null,
    origin: null,
    panel: null,
    portrait: null,
    zoom: 0
  }

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
          <img src={`/imagecache/fit=contain&w=400&h=200/${asset.path}`} { ...this._getImage() } />
          <div className="maha-imageeditor-crop-frame" { ...this._getFrame() } />
        </div>
        <div className="maha-imageeditor-crop-footer">
          <input { ...this._getRange() } />
        </div>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { zoom, offset } = this.state
    const { ratio } = this.props
    if(ratio !== prevProps.ratio) {
      this._handleChangeRatio()
    } else if(zoom !== prevState.zoom) {
      this._handleChange()
    } else if(!_.isEqual(offset, prevState.offset)) {
      this._handleChange()
    }
  }

  _getImage() {
    return {
      style: this._getImageStyle(),
      ref: node => this.image = node,
      onLoad: this._handleInit
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
    const { zoom, image, offset, panel } = this.state
    if(!image) return { width: '100%' }
    const zoomscale = zoom * this.scale
    const width = image.w + zoomscale
    const height = (image.h / image.w) * (image.w + zoomscale)
    return {
      width,
      height,
      left: (panel.w / 2) - (width / 2) + offset.x,
      top: (panel.h / 2) - (height / 2) + offset.y
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
    const { natural, image, frame, offset, zoom } = this.state
    const { ratio } = this.props
    const scale = natural.w / image.w
    const zoomscale = zoom * this.scale
    const zoomed = {
      w: image.w + zoomscale,
      h: (image.h / image.w) * (image.w + zoomscale)
    }
    const cropped = {
      w: (frame.w / zoomed.w) * zoomed.w,
      h: (frame.h / zoomed.h) * zoomed.h,
      x: (zoomed.w / 2) - (frame.w / 2) - frame.w - offset.x,
      y: (zoomed.h / 2) - (frame.h / 2) - frame.h - offset.y
    }
    console.log(offset, zoomscale, cropped)
    const scaled = {
      w: Math.floor(cropped.w * scale),
      h: Math.floor(cropped.h * scale),
      x: Math.floor(cropped.x * scale),
      y: Math.floor(cropped.y * scale)
    }
    this.props.onAdjust('crop', {
      w: Math.floor(cropped.w * scale),
      h: Math.floor(cropped.h * scale),
      x: Math.floor(cropped.x * scale),
      y: Math.floor(cropped.y * scale),
      ra: ratio,
      zo: zoom,
      ox: offset.x,
      oy: offset.y
    })
  }

  _handleDragStart(e) {
    const { offset } = this.state
    this.setState({
      dragging: true,
      origin: {
        x: e.screenX - offset.x,
        y: e.screenY - offset.y
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
    const { dragging, origin } = this.state
    if(!dragging) return
    this._handleUpdate({
      offset: {
        x: e.screenX - origin.x,
        y: e.screenY - origin.y
      }
    })
  }

  _handleInit() {
    const { crop } = this.props.transforms
    const { clientWidth, clientHeight, naturalWidth, naturalHeight } = this.image
    const { offsetWidth, offsetHeight } = this.panel
    const natural = { w: naturalWidth, h: naturalHeight }
    const ratio = this.props.ratio || (natural.w / natural.h)
    const portrait = natural.w > natural.h
    const panel = { x: 0, y: 0, w: offsetWidth, h: offsetHeight }
    const zoom = crop ? crop.zo : 0
    const offset = {
      x: crop ? crop.ox : 0,
      y: crop ? crop.oy : 0
    }
    const image = {}
    image.w = panel.w - this.padding
    image.h = (clientHeight / clientWidth) * image.w
    const frame = {
      w: portrait ? ratio * image.h : image.h,
      h: portrait ? image.h : ratio * image.w
    }
    frame.x = (panel.w - frame.w) / 2
    frame.y = (panel.h - frame.h) / 2
    this._handleUpdate({
      frame,
      natural,
      image,
      offset,
      panel,
      portrait,
      zoom
    })
  }

  _handleChangeRatio() {
    const { image, natural, panel, portrait } = this.state
    const ratio = this.props.ratio || (natural.w / natural.h)
    const frame = {
      w: portrait ? ratio * image.h : image.h,
      h: portrait ? image.h : ratio * image.w
    }
    frame.x = (panel.w - frame.w) / 2
    frame.y = (panel.h - frame.h) / 2
    this._handleUpdate({ frame })
  }

  _handleWheel(e) {
    const { zoom } = this.state
    this._handleUpdate({
      zoom: zoom - e.movementY
    })
  }

  _handleZoom(e) {
    this._handleUpdate({
      zoom: e.target.value
    })
  }

  _handleUpdate(state) {
    const frame = state.frame || this.state.frame
    const image = state.image || this.state.image
    const zoom = Math.max(0, state.zoom || this.state.zoom)
    const offset = state.offset || this.state.offset
    const zoomscale = zoom * this.scale
    const width = image.w + zoomscale
    const height = (image.h / image.w) * (image.w + zoomscale)
    const min = {
      x: (frame.w / 2) - (width / 2),
      y: (frame.h / 2) - (height / 2)
    }
    const max = {
      x: (width / 2) - (frame.w / 2),
      y: (height / 2) - (frame.h / 2)
    }
    this.setState({
      ...state,
      offset: {
        x: Math.floor(Math.max(min.x, Math.min(max.x, offset.x))),
        y: Math.floor(Math.max(min.y, Math.min(max.y, offset.y)))
      },
      zoom
    })
  }

}

export default Crop
