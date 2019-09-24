import ModalPanel from '../../modal_panel'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

const ratios = [
  { label: 'Square', name: 'square', w: 1, h: 1 },
  { label: '3:2', name: '3_2', w: 3, h: 2 },
  { label: '5:3', name: '5_3', w: 5, h: 3 },
  { label: '4:3', name: '4_3', w: 4, h: 3 },
  { label: '5:4', name: '5_4', w: 5, h: 4 },
  { label: '7:5', name: '7_5', w: 7, h: 5 },
  { label: '16:9', name: '16_9', w: 16, h: 9 }
]

class Crop extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    transforms: PropTypes.object,
    onAdjust: PropTypes.func,
    onBack: PropTypes.func
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
                  <div className={ this._getClass(ratio) } onClick={ this._handleClick.bind(this, ratio.name) }>
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

  _getClass(filter) {
    const { transforms } = this.props
    const classes = ['maha-imageeditor-button']
    if(transforms.crop === filter.name) classes.push('active')
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

  _handleClick(name) {
    // const value = name !== 'original' ? name : null
    // this.props.onAdjust('filter', value)
  }

}

const mapStateToProps = (state, props) => ({
  transforms: state.maha.image_editor.transforms
})

export default connect(mapStateToProps)(Crop)
