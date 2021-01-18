import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import React from 'react'

class Crop extends React.PureComponent {

  static propTypes = {
    asset: PropTypes.object,
    canvas: PropTypes.object,
    crop: PropTypes.object,
    image: PropTypes.object,
    orientation: PropTypes.object,
    transforms: PropTypes.array,
    onBack: PropTypes.func,
    onPopTransform: PropTypes.func,
    onPushTransform: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)

  render() {
    const ratios = this._getRatios()
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-imageeditor-crops">
          <div className="maha-imageeditor-grid">
            { ratios.map((ratio, index) => (
              <div className="maha-imageeditor-row" key={`row_${index}`}>
                <div className="maha-imageeditor-column">
                  <div className={ this._getClass(index) } onClick={ this._handleClick.bind(this, ratio.ratio) }>
                    { ratio.label}
                  </div>
                </div>
              </div>
            )) }
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getClass(index) {
    const selected = this._getSelected()
    const classes = ['maha-imageeditor-button']
    if(index === selected) classes.push('active')
    return classes.join(' ')
  }

  _getPanel() {
    return {
      title: 'Crop / Resize',
      color: 'grey',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _getRatios() {
    const { image, orientation } = this.props
    if(orientation.mode === 'landscape') {
      return [
        { label: 'Original', ratio: image.width / image.height },
        { label: 'Square', ratio: 1 },
        { label: '16:9', ratio: 16/9 },
        { label: '10:8', ratio: 10/8 },
        { label: '7:5', ratio: 7/5 },
        { label: '4:3', ratio: 4/3 },
        { label: '5:3', ratio: 5/3 },
        { label: '3:2', ratio: 3/2 }
      ]
    }
    return [
      { label: 'Original', ratio: image.width / image.height },
      { label: 'Square', ratio: 1 },
      { label: '9:16', ratio: 9/16 },
      { label: '8:10', ratio: 8/10 },
      { label: '5:7', ratio: 5/7 },
      { label: '3:4', ratio: 3/4 },
      { label: '3:5', ratio: 3/5 },
      { label: '2:3', ratio: 2/3 }
    ]
  }

  _getSelected() {
    const ratios = this._getRatios()
    const { crop } = this.props
    return ratios.findIndex(ratio => {
      return ratio.ratio === crop.ratio
    })
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleClick(ratio) {
    const { canvas, image, orientation } = this.props
    ratio = orientation.mode !== image.mode ? 1 / ratio : ratio
    const viewport = {
      width: ratio > 1 ? canvas.width : canvas.width * ratio,
      height: ratio > 1 ? canvas.height / ratio : canvas.height
    }
    const scaled = {
      width: image.mode === 'portrait' ? viewport.width : (image.width / image.height) * viewport.height,
      height: image.mode === 'portrait' ? (image.height / image.width) * viewport.width : viewport.height
    }
    const scalar = {
      h: image.width / scaled.width,
      v: image.height / scaled.height,
    }
    const crop = {
      left: ((scaled.width - viewport.width) / 2) * scalar.h,
      top: ((scaled.height - viewport.height) / 2) * scalar.v,
      width: viewport.width * scalar.h,
      height: viewport.height * scalar.v
    }
    console.log({ ratio, canvas, image, viewport, scaled, scalar, crop })
    const value = [crop.left,crop.top,crop.width,crop.height].join(',')
    this.props.onPushTransform('crop', value)
  }

}

export default Crop
