import ModalPanel from '../../modal_panel'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

const landscape = [
  { label: 'Original', ratio: null },
  { label: 'Square', ratio: 1.00 },
  { label: '3:2', ratio: 1.50 },
  { label: '5:3', ratio: 1.66 },
  { label: '4:3', ratio: 1.33 },
  { label: '5:4', ratio: 1.25 },
  { label: '7:5', ratio: 1.40 },
  { label: '16:9', ratio: 1.77 }
]

const portrait = [
  { label: 'Original', ratio: null },
  { label: 'Square', ratio: 1.00 },
  { label: '2:3', ratio: 0.66 },
  { label: '3:5', ratio: 0.60 },
  { label: '3:4', ratio: 0.75 },
  { label: '4:5', ratio: 0.80 },
  { label: '5:7', ratio: 0.71 },
  { label: '9:16', ratio: 0.56 }
]

class Crop extends React.PureComponent {

  static propTypes = {
    height: PropTypes.number,
    ratio: PropTypes.number,
    transforms: PropTypes.object,
    width: PropTypes.number,
    onAdjust: PropTypes.func,
    onBack: PropTypes.func,
    onCrop: PropTypes.func,
    onSetRatio: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)

  render() {
    const { width, height } = this.props
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
    this.props.onCrop(true)
  }

  componentWillUnmount() {
    this.props.onCrop(false)
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
    this.props.onSetRatio(ratio)
  }

}

const mapStateToProps = (state, props) => ({
  height: state.maha.image_editor.height,
  ratio: state.maha.image_editor.ratio,
  transforms: state.maha.image_editor.transforms,
  width: state.maha.image_editor.width
})

export default connect(mapStateToProps)(Crop)
