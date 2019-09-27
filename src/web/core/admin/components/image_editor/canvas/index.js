import PropTypes from 'prop-types'
import Caman from '../caman'
import React from 'react'
import _ from 'lodash'

class Canvas extends React.PureComponent {

  static propTypes = {
    asset: PropTypes.object,
    ratio: PropTypes.number,
    transforms: PropTypes.object
  }

  canvas = null
  panel = null

  _handleRender = _.throttle(this._handleRender.bind(this), 500)

  render() {
    return (
      <div className="maha-imageeditor-canvas" ref={ node => this.panel = node }>
        <canvas ref={ node => this.canvas = node } style={ this._getStyle() } />
      </div>
    )
  }

  componentDidMount() {
    this._handleInit()
    this._handleRender()
  }

  componentDidUpdate(prevProps) {
    const { transforms } = this.props
    if(!_.isEqual(transforms, prevProps.transforms)) {
      this._handleRender()
    }
  }

  _getStyle() {
    if(!this.panel) return
    const { width, height } = this.state
    if(width) return { width }
    if(height) return { height }
  }

  _handleInit() {
    const { offsetWidth, offsetHeight } = this.panel
    const { asset } = this.props
    const { width, height } = asset.metadata
    const landscape = width >= height
    this.setState({
      width: landscape ? null : Math.floor((width / height) * (offsetHeight - 50)),
      height: landscape ? Math.floor((height / width) * (offsetWidth - 20)) : null
    })
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
