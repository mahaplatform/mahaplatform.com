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
          <img src={`/imagecache/${asset.path}`} { ...this._getImage() } />
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
      this._handleInit()
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
    return {
      top: ((panel.h - image.h) / 2) + offset.y,
      left: ((panel.w - image.w) / 2) + offset.x,
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
    const { natural, image, frame, offset, zoom } = this.state
    const { ratio } = this.props
    const scale = {
      x: natural.w / image.w,
      y: natural.h / image.h
    }
    this.props.onAdjust('crop', {
      w: Math.floor(frame.w * scale.x),
      h: Math.floor(frame.h * scale.y),
      x: Math.floor(((image.w / 2) - (frame.w / 2) - offset.x) * scale.x),
      y: Math.floor(((image.h / 2) - (frame.h / 2) - offset.y) * scale.y),
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
    const ratio = this.props.ratio || (naturalWidth / naturalHeight)
    const natural = { w: naturalWidth, h: naturalHeight }
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
      w: image.w > image.h ? ratio * image.h : image.h,
      h: image.w > image.h ? image.h : ratio * image.w
    }
    frame.x = (panel.w - frame.w) / 2
    frame.y = (panel.h - frame.h) / 2
    this._handleUpdate({
      frame,
      natural,
      image,
      offset,
      panel,
      zoom
    })
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
    const min = {
      x: (frame.w / 2) - (image.w / 2) - zoomscale,
      y: 0 - zoomscale
    }
    const max = {
      x: (image.w / 2) - (frame.w / 2),
      y: 0
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
