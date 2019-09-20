import PropTypes from 'prop-types'
import React from 'react'
import Jimp from 'jimp'
import _ from 'lodash'

class Canvas extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    asset: PropTypes.object,
    transforms: PropTypes.array,
    width: PropTypes.number
  }

  image = null

  state = {
    datauri: null,
    width: null,
    height: null
  }

  static defaultProps = {}

  render() {
    const { datauri } = this.state
    return (
      <div className="maha-photoeditor-canvas">
        { datauri &&
          <div className="maha-photoeditor-canvas-frame">
            <img src={ datauri } style={ this._getStyle() } />
          </div>
        }
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { asset, transforms } = this.props
    if(asset !== prevProps.asset) {
      this._handleLoadAsset()
    }
    if(!_.isEqual(transforms, prevProps.transforms)) {
      this._handleTransform()
    }
  }

  _getDimensions(width, height) {
    const cwidth = 640
    const cheight = 660
    const portrait = width <= height
    const w1 = portrait ? (width / height) * cheight : cwidth
    const h1 = portrait ? cheight : (height / width) * cwidth
    if(w1 <= cwidth && h1 <= cheight) return [w1,h1]
    return [cwidth,cheight]
  }

  _getStyle() {
    const [ width, height ] = this._getDimensions(this.state.width,this.state.height)
    return { width, height }
  }

  _handleLoadAsset() {
    const { asset } = this.props
    Jimp.read(asset.signed_url, (err, image) => {
      this.image = image
      const [ width, height ] = this._getDimensions(image.bitmap.width,image.bitmap.height)
      this.image.resize(width, height)
      this._handleTransform()
    })
  }

  _handleTransform() {
    const { transforms } = this.props
    if(!this.image) return
    const image = this.image.clone()
    transforms.map(transform => {
      if(transform.rot) {
        image.rotate(transform.rot)
      } else if(transform.flip) {
        if(transform.flip === 'h') {
          image.flip(true, false)
        } else if(transform.flip === 'v') {
          image.flip(false, true)
        } else if(transform.flip === 'vh') {
          image.flip(true, true)
        }
      } else if(transform.bri) {
        image.brightness(transform.bri / 100)
      } else if(transform.con) {
        image.contrast(transform.con / 100)
      }
    })
    image.getBase64(Jimp.MIME_JPEG, (err, datauri) => {
      this.setState({
        datauri,
        width: image.bitmap.width,
        height: image.bitmap.height
      })
    })
  }

}

export default Canvas
