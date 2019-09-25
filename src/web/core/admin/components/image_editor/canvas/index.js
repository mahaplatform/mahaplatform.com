import PropTypes from 'prop-types'
import Caman from '../caman'
import React from 'react'
import _ from 'lodash'

class Canvas extends React.PureComponent {

  static propTypes = {
    asset: PropTypes.object,
    ratio: PropTypes.number,
    transforms: PropTypes.object,
    width: PropTypes.number
  }

  canvas = null

  _handleRender = _.throttle(this._handleRender.bind(this), 500)

  render() {
    return (
      <div className="maha-imageeditor-canvas">
        <canvas ref={ node => this.canvas = node } />
      </div>
    )
  }

  componentDidMount() {
    this._handleRender()
  }

  componentDidUpdate(prevProps) {
    const { transforms } = this.props
    if(!_.isEqual(transforms, prevProps.transforms)) {
      this._handleRender()
    }
  }

  _handleRender() {
    const { asset, transforms } = this.props
    const { blur, bri, con, crop, exp, filter, flip, gamma, hue, invert, noise, rot, sat, sepia, sharp, text, vibrance } = transforms
    Caman(this.canvas, `/imagecache/${asset.path}`, function() {
      this.reset()
      if(crop) this.crop(crop)
      if(blur) this.stackBlur(blur)
      if(bri) this.brightness(bri)
      if(con) this.contrast(con)
      if(exp) this.exposure(exp)
      if(filter) this[filter]()
      if(flip) this.flip(flip)
      if(gamma) this.gamma(gamma)
      if(hue) this.hue(hue)
      if(invert) this.invert(invert)
      if(noise) this.noise(noise)
      if(sat) this.saturation(sat)
      if(sepia) this.sepia(sepia)
      if(sharp) this.sepia(sharp)
      if(vibrance) this.vibrance(vibrance)
      if(rot) this.rotate(rot)
      if(text) this.text(text)
      this.render()
    })
  }

}

export default Canvas
