import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import React from 'react'

const landscape = [
  { label: 'Original', ratio: null },
  { label: 'Square', ratio: 1.00 },
  { label: '16:9', ratio: 1.77 },
  { label: '10:8', ratio: 1.25 },
  { label: '7:5', ratio: 1.40 },
  { label: '4:3', ratio: 1.33 },
  { label: '5:3', ratio: 1.66 },
  { label: '3:2', ratio: 1.50 }
]

const portrait = [
  { label: 'Original', ratio: null },
  { label: 'Square', ratio: 1.00 },
  { label: '9:16', ratio: 0.56 },
  { label: '8:10', ratio: 0.8 },
  { label: '5:7', ratio: 0.71 },
  { label: '3:4', ratio: 0.75 },
  { label: '3:5', ratio: 0.60 },
  { label: '2:3', ratio: 0.66 }
]

class Crop extends React.PureComponent {

  static propTypes = {
    asset: PropTypes.object,
    ratio: PropTypes.number,
    transforms: PropTypes.array,
    width: PropTypes.number,
    onBack: PropTypes.func,
    onPopTransform: PropTypes.func,
    onPushTransform: PropTypes.func,
    onSetMode: PropTypes.func,
    onSetRatio: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)

  render() {
    const { asset } = this.props
    const { width, height } = asset.metadata
    const ratios = width >= height ? landscape : portrait
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-imageeditor-crops">
          <div className="maha-imageeditor-grid">
            { ratios.map((ratio, i) => (
              <div className="maha-imageeditor-row" key={`chunk_${i}`}>
                <div className="maha-imageeditor-column">
                  <div className={ this._getClass(ratio) } onClick={ this._handleClick.bind(this, ratio.ratio) }>
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

  componentDidMount() {
    this.props.onSetMode('crop')
  }

  componentWillUnmount() {
    this.props.onSetMode(null)
  }

  _getClass(ratio) {
    const classes = ['maha-imageeditor-button']
    if(this.props.ratio === ratio.ratio) classes.push('active')
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

  _handleAdjust(key, value) {
    this.props.onAdjust(key, value)
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleClick(ratio) {
    const { asset } = this.props
    const { width, height } = asset.metadata
    this.props.onSetRatio(ratio || (width / height))
  }

}

export default Crop
