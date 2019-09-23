import PropTypes from 'prop-types'
import Caman from './caman'
import React from 'react'
import _ from 'lodash'

class Canvas extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    asset: PropTypes.object,
    transforms: PropTypes.object,
    width: PropTypes.number
  }

  canvas = null

  static defaultProps = {}

  _handleRender = _.throttle(this._handleRender.bind(this), 500)

  render() {
    return (
      <div className="maha-imageeditor-canvas">
        <div className="maha-imageeditor-canvas-frame">
          <canvas ref={ node => this.canvas = node } />
        </div>
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
    const { bri, con, exp, flip, gamma, hue, invert, noise, rot, sat, sepia, txt, vibrance } = transforms
    Caman(this.canvas, `/imagecache/w=630${asset.path}`, function() {
      this.revert()
      if(bri) this.brightness(parseInt(bri))
      if(con) this.contrast(parseInt(con))
      if(exp) this.exposure(exp)
      if(flip) this.flip(flip)
      if(gamma) this.gamma(gamma)
      if(hue) this.hue(hue)
      if(invert) this.invert(invert)
      if(noise) this.noise(noise)
      if(txt) this.text(txt)
      if(sat) this.saturation(sat)
      if(sepia) this.sepia(sepia)
      if(vibrance) this.vibrance(vibrance)
      if(rot) this.rotate(rot)
      this.render()
    })
  }

}

export default Canvas
