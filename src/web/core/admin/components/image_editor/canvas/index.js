import PropTypes from 'prop-types'
import Caman from '../caman'
import React from 'react'
import _ from 'lodash'

class Canvas extends React.Component {

  static propTypes = {
    asset: PropTypes.object,
    ratio: PropTypes.number,
    transforms: PropTypes.object
  }

  canvas = null
  padding = 18
  panel = null

  state = {
    panel: null,
    frame: null
  }

  _handleRedraw = this._handleRedraw.bind(this)
  _handleRender = _.throttle(this._handleRender.bind(this), 500, { leading: true })
  _handleResize = this._handleResize.bind(this)
  _handleInit = this._handleInit.bind(this)

  render() {
    return (
      <div className="maha-imageeditor-canvas" ref={ node => this.panel = node }>
        <div className="maha-imageeditor-frame" style={ this._getStyle() }>
          <canvas ref={ node => this.canvas = node } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    this._handleInit()
  }

  componentDidUpdate(prevProps, prevState) {
    const { panel } = this.state
    const { transforms } = this.props
    if(!_.isEqual(panel, prevState.panel)) {
      this._handleRedraw()
    } else if(!_.isEqual(transforms, prevProps.transforms)) {
      this._handleRedraw()
    }
  }

  _getStyle() {
    const { frame } = this.state
    if(!frame) return
    return {
      width: frame.w,
      height: frame.h
    }
  }

  _handleInit() {
    const { offsetWidth, offsetHeight } = this.panel
    const { padding } = this
    this.setState({
      panel: {
        w: offsetWidth - padding,
        h: offsetHeight - 30 - padding
      }
    })
  }

  _handleRedraw() {
    this._handleResize()
    this._handleRender()
  }

  _handleResize() {
    const { panel } = this.state
    const { asset, transforms } = this.props
    const { width, height } = asset.metadata
    const landscape = width >= height
    const image = {
      w: transforms.crop ? transforms.crop.w : width,
      h: transforms.crop ? transforms.crop.h : height
    }
    const frame = {
      w: landscape ? panel.w : Math.floor((image.w / image.h) * panel.h),
      h: landscape ? Math.floor((image.h / image.w) * panel.w) : panel.h
    }
    this.setState({ frame })
  }

  _handleRender() {
    const { asset, transforms } = this.props
    const { blur, bri, con, crop, exp, filter, flip, gamma, hue, invert, noise, rot, sat, sepia, sharp, vibrance } = transforms
    Caman(this.canvas, `/imagecache${asset.path}`, function() {
      this.reset()
      if(crop) this.crop(crop.w,crop.h,crop.x,crop.y)
      if(blur) this.stackBlur(blur)
      if(bri) this.brightness(bri)
      if(con) this.contrast(con)
      if(exp) this.exposure(exp)
      if(filter) this[filter]()
      if(flip) this.flip(flip)
      if(gamma) this.gamma(gamma)
      if(hue) this.hue(hue)
      if(invert) this.invert()
      if(noise) this.noise(noise)
      if(sat) this.saturation(sat)
      if(sepia) this.sepia(sepia)
      if(sharp) this.sharp(sharp)
      if(vibrance) this.vibrance(vibrance)
      if(rot) this.rotate(rot)
      this.render()
    })
  }

}

export default Canvas
