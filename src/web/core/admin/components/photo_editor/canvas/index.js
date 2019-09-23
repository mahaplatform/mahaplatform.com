import PropTypes from 'prop-types'
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
  context = null
  frame = null
  image = null

  static defaultProps = {}

  _handleLoad = this._handleLoad.bind(this)
  _handleRender = this._handleRender.bind(this)

  render() {
    return (
      <div className="maha-photoeditor-canvas">
        <div className="maha-photoeditor-canvas-frame" ref={ node => this.frame = node } />
      </div>
    )
  }

  componentDidMount() {
    const { asset } = this.props
    this.image = new Image()
    this.image.onload = this._handleLoad
    this.image.src = `/imagecache/w=630${asset.path}`
  }

  componentDidUpdate(prevProps) {
    const { transforms } = this.props
    if(!_.isEqual(transforms, prevProps.transforms)) {
      this._handleRender()
    }
  }

  _getPixels(data) {
    return _.chunk(data.slice(0), 4).map(pixel => ({
      r: pixel[0],
      g: pixel[1],
      b: pixel[2],
      a: pixel[3]
    }))
  }

  _getBrightness(val) {
    return (pixel) => ({
      r: pixel.r + val,
      g: pixel.g + val,
      b: pixel.b + val,
      a: pixel.a
    })
  }

  _getContrast(val) {
    const scale = Math.pow((val + 100) / 100, 2)
    return (pixel) => ({
      r: ((((pixel.r / 255) - 0.5) * scale) + 0.5) * 255,
      g: ((((pixel.g / 255) - 0.5) * scale) + 0.5) * 255,
      b: ((((pixel.b / 255) - 0.5) * scale) + 0.5) * 255,
      a: pixel.a
    })
  }

  _getGamma(val) {
    return (pixel) => ({
      r:  Math.pow(pixel.r / 255, val) * 255,
      g: Math.pow(pixel.g / 255, val) * 255,
      b: Math.pow(pixel.b / 255, val) * 255,
      a: pixel.a
    })
  }

  _getSaturation(val) {
    const scale = val * -0.01
    return (pixel) => {
      const max = Math.max(pixel.r, pixel.g, pixel.b)
      return {
        r: pixel.r + (pixel.r !== max ? (max - pixel.r) * scale : 0),
        g: pixel.g + (pixel.g !== max ? (max - pixel.g) * scale : 0),
        b: pixel.b + (pixel.b !== max ? (max - pixel.b) * scale : 0),
        a: pixel.a
      }
    }
  }

  _getVibrance(val) {
    return (pixel) => {
      const max = Math.max(pixel.r, pixel.g, pixel.b)
      const avg = (pixel.r + pixel.g + pixel.b) / 3
      const scale = ((Math.abs(max - avg) * 2 / 255) * val * -1) / 100
      return {
        r: pixel.r + (pixel.r !== max ? (max - pixel.r) * scale : 0),
        g: pixel.g + (pixel.g !== max ? (max - pixel.g) * scale : 0),
        b: pixel.b + (pixel.b !== max ? (max - pixel.b) * scale : 0),
        a: pixel.a
      }
    }
  }

  _getLuminance(pixel) {
    return (0.299 * pixel.r) + (0.587 * pixel.g) + (0.114 * pixel.b)
  }

  _getGreyscale() {
    return (pixel) => {
      const avg = this._getLuminance(pixel)
      return {
        r: avg,
        g: avg,
        b: avg,
        a: pixel.a
      }
    }
  }

  _getNoise(val) {
    const scale = Math.abs(val) * 2.55
    return (pixel) => {
      const rand = Math.round((0 - scale) + (Math.random() * scale * 2))
      return {
        r: pixel.r + rand,
        g: pixel.g + rand,
        b: pixel.b + rand,
        a: pixel.a
      }
    }
  }

  _getSepia(val) {
    const adjust = val / 100
    return (pixel) => {
      return {
        r: Math.min(255, (pixel.r * (1 - (0.607 * adjust))) + (pixel.g * (0.769 * adjust)) + (pixel.b * (0.189 * adjust))),
        g: Math.min(255, (pixel.r * (0.349 * adjust)) + (pixel.g * (1 - (0.314 * adjust))) + (pixel.b * (0.168 * adjust))),
        b: Math.min(255, (pixel.r * (0.272 * adjust)) + (pixel.g * (0.534 * adjust)) + (pixel.b * (1- (0.869 * adjust)))),
        a: pixel.a
      }
    }
  }

  _getTransformed(pixels, transforms) {
    return transforms.reduce((transformed, transform) => {
      return transformed.map(transform)
    }, pixels.slice(0))
  }

  _handleApply(data, transformed) {
    transformed.map((pixel, index) => {
      data[4 * index] = pixel.r
      data[(4 * index) + 1] = pixel.g
      data[(4 * index) + 2] = pixel.b
      data[(4 * index) + 3] = pixel.a
    })
  }

  _handleLoad() {
    this.canvas = this._getCanvas()
    this.frame.appendChild(this.canvas)
  }

  _handleRender() {
    const canvas = this._getCanvas()
    this.canvas.parentNode.replaceChild(canvas, this.canvas)
    this.canvas = canvas
  }

  _getCanvas() {
    const { transforms } = this.props
    const { bri, con, gamma, noise, rot, sat, sepia, vibrance } = transforms
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = this.image.width
    canvas.height = this.image.height
    context.drawImage(this.image, 0, 0)
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    const pixelData = imageData.data
    // context.translate(this.canvas.width / 2, this.canvas.height / 2)
    const pixels = this._getPixels(pixelData)
    const transformed = this._getTransformed(pixels, [
      ...bri ? [this._getBrightness(bri)] : [],
      ...con ? [this._getContrast(con)] : [],
      ...gamma ? [this._getGamma(gamma)] : [],
      ...noise ? [this._getNoise(noise)] : [],
      ...sat ? [this._getSaturation(sat)] : [],
      ...sepia ? [this._getSepia(sepia)] : [],
      ...vibrance ? [this._getVibrance(vibrance)] : []
    ])
    this._handleApply(pixelData, transformed)
    // if(rot) context.rotate(rot * (Math.PI / 180))
    context.putImageData(imageData, 0, 0)
    return canvas
  }

}

export default Canvas
