import PropTypes from 'prop-types'
import Croppie from 'croppie'
import React from 'react'

class Crop extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    asset: PropTypes.object,
    ratio: PropTypes.number,
    transforms: PropTypes.object,
    onAdjust: PropTypes.func
  }

  static defaultProps = {}

  croppie = null
  cropper = null
  panel = null

  _handleChange = this._handleChange.bind(this)

  render() {
    return (
      <div className="maha-imageeditor-crop" ref={ node => this.panel = node }>
        <div className="maha-imageeditor-crop-cropper" ref={ node => this.cropper = node } />
      </div>
    )
  }

  componentDidMount() {
    this._handleInit()
  }

  componentDidUpdate(prevProps) {
    const { ratio } = this.props
    if(ratio !== prevProps.ratio) {
      this.croppie.destroy()
      this._handleInit()
    }
  }

  _handleInit() {
    const { asset, ratio } = this.props
    const { offsetWidth } = this.panel
    this.croppie = new Croppie(this.cropper, {
      url: `/imagecache/${asset.path}`,
      viewport: {
        width: offsetWidth - 100,
        height: (offsetWidth - 100) / ratio,
        type: 'square'
      }
    })
    this.cropper.addEventListener('update', this._handleChange)
  }

  _handleChange(ev) {
    const points = ev.detail.points.map(i => parseInt(i))
    this.props.onAdjust('crop', [
      points[2] - points[0],
      points[3] - points[1],
      points[0],
      points[1]      
    ])
  }

}

export default Crop
