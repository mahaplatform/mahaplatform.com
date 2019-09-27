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

  padding = 18
  panel = null
  image = null
  scale = 5

  state = {
    dragging: false,
    offset: null,
    origin: null,
    panel: null,
    landscape: null,
    source: null,
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
      <div className="maha-imageeditor-crop">
        <div className="maha-imageeditor-crop-body" { ...this._getBody() }>
          <img src={`/imagecache${asset.path}`} { ...this._getImage() } />
          <div className="maha-imageeditor-crop-frame" { ...this._getFrame() } />
        </div>
        <div className="maha-imageeditor-crop-footer">
          <input { ...this._getRange() } />
        </div>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { frame, offset, zoom } = this.state
    const { ratio } = this.props
    if(ratio !== prevProps.ratio) {
      this._handleChangeRatio()
    } else if(!_.isEqual(frame, prevState.frame)) {
      this._handleChange()
    } else if(!_.isEqual(offset, prevState.offset)) {
      this._handleChange()
    } else if(zoom !== prevState.zoom) {
      this._handleChange()
    }
  }

  _getBody() {
    return {
      ref: node => this.panel = node,
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
    const { frame, source } = this.state
    if(!source) return {}
    return {
      left: frame.x,
      top: frame.y,
      width: frame.w,
      height: frame.h
    }
  }

  _getImage() {
    return {
      style: this._getImageStyle(),
      ref: node => this.image = node,
      onLoad: this._handleInit
    }
  }

  _getImageStyle() {
    const { image, offset, panel, source } = this.state
    if(!source) return { width: '100%' }
    return {
      width: image.w,
      height: image.h,
      left: (panel.w / 2) - (image.w / 2) + offset.x,
      top: (panel.h / 2) - (image.h / 2) + offset.y
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
    const { image, source, frame, offset, zoom } = this.state
    const { asset, ratio } = this.props
    const dscale = asset.metadata.width / source.w
    const pscale = asset.metadata.width / image.w
    const cropped = {
      w: (source.w / image.w) * frame.w,
      h: (source.h / image.h) * frame.h,
      x: (image.w / 2) - (frame.w / 2) - offset.x,
      y: (image.h / 2) - (frame.h / 2) - offset.y
    }
    this.props.onAdjust('crop', {
      w: Math.floor(cropped.w * dscale),
      h: Math.floor(cropped.h * dscale),
      x: Math.floor(cropped.x * pscale),
      y: Math.floor(cropped.y * pscale),
      ra: ratio,
      zo: zoom,
      ox: offset.x,
      oy: offset.y
    })
  }

  _handleChangeRatio() {
    const { panel, landscape, source } = this.state
    const { asset } = this.props
    const ratio = this.props.ratio || asset.metadata.width / asset.metadata.height
    const frame = {
      w: landscape ? ratio * source.h : source.w,
      h: landscape ? source.h : source.w / ratio
    }
    frame.x = (panel.w - frame.w) / 2
    frame.y = (panel.h - frame.h) / 2
    this._handleUpdate({ frame })
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
    const { asset, transforms } = this.props
    const { crop } = transforms
    const { clientWidth, clientHeight } = this.image
    const { offsetWidth, offsetHeight } = this.panel
    const ratio = this.props.ratio || asset.metadata.width / asset.metadata.height
    const landscape = asset.metadata.width >= asset.metadata.height
    const panel = { x: 0, y: 0, w: offsetWidth, h: offsetHeight }
    const zoom = crop ? crop.zo : 0
    const offset = {
      x: crop ? crop.ox : 0,
      y: crop ? crop.oy : 0
    }
    const source = {}
    source.w = landscape ? panel.w - this.padding : (clientWidth / clientHeight) * (panel.h - this.padding)
    source.h = landscape ? (clientHeight / clientWidth) * (panel.w - this.padding) : panel.h - this.padding
    const frame = {
      w: landscape ? ratio * source.h : source.w,
      h: landscape ? source.h : source.w / ratio
    }
    frame.x = (panel.w - frame.w) / 2
    frame.y = (panel.h - frame.h) / 2
    this._handleUpdate({
      frame,
      offset,
      panel,
      landscape,
      source,
      zoom
    })
  }

  _handleUpdate(state) {
    const frame = state.frame || this.state.frame
    const source = state.source || this.state.source
    const zoom = Math.max(0, state.zoom || this.state.zoom)
    const offset = state.offset || this.state.offset
    const zoomscale = zoom * this.scale
    const image = {
      w: source.w + zoomscale,
      h: (source.h / source.w) * (source.w + zoomscale)
    }
    const min = {
      x: (frame.w / 2) - (image.w / 2),
      y: (frame.h / 2) - (image.h / 2)
    }
    const max = {
      x: (image.w / 2) - (frame.w / 2),
      y: (image.h / 2) - (frame.h / 2)
    }
    this.setState({
      ...state,
      image,
      offset: {
        x: Math.floor(Math.max(min.x, Math.min(max.x, offset.x))),
        y: Math.floor(Math.max(min.y, Math.min(max.y, offset.y)))
      },
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

}

export default Crop
