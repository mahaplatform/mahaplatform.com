import ModalPanel from '../../modal_panel'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

const ratios = [
  { label: 'Original', ratio: null },
  { label: 'Square', ratio: 1.00 },
  { label: '3:2', ratio: 1.50 },
  { label: '5:3', ratio: 1.66 },
  { label: '4:3', ratio: 1.33 },
  { label: '5:4', ratio: 1.25 },
  { label: '7:5', ratio: 1.40 },
  { label: '16:9', ratio: 1.77 }
]

class Crop extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    ratio: PropTypes.number,
    transforms: PropTypes.object,
    onAdjust: PropTypes.func,
    onBack: PropTypes.func,
    onCrop: PropTypes.func,
    onSetRatio: PropTypes.func
  }

  static defaultProps = {}

  _handleBack = this._handleBack.bind(this)

  render() {
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
  ratio: state.maha.image_editor.ratio,
  transforms: state.maha.image_editor.transforms
})

export default connect(mapStateToProps)(Crop)
