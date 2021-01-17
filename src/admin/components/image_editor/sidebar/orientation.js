import ModalPanel from '../../modal_panel'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Orientation extends React.PureComponent {

  static propTypes = {
    asset: PropTypes.object,
    transforms: PropTypes.array,
    onBack: PropTypes.func,
    onPopTransform: PropTypes.func,
    onPushTransform: PropTypes.func
  }

  orientations = [
    { label: 'Rotate CW', icon: 'repeat', handler: this._handleRotate.bind(this, 90) },
    { label: 'Rotate CCW', icon: 'undo', handler: this._handleRotate.bind(this, -90) },
    { label: 'Flip Horizontal', icon: 'arrows-h', handler: this._handleFlip.bind(this, 'h') },
    { label: 'Flip Vertical', icon: 'arrows-v', handler: this._handleFlip.bind(this, 'v') }
  ]

  _handleBack = this._handleBack.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-imageeditor-grid">
          { this.orientations.map((orientation, index) => (
            <div className="maha-imageeditor-row" key={`row_${index}`}>
              <div className="maha-imageeditor-column">
                <div className="maha-imageeditor-button" onClick={ orientation.handler }>
                  { orientation.label}
                </div>
              </div>
            </div>
          )) }
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Orientation',
      color: 'grey',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _handleFlip(newvalue) {
    const { transforms } = this.props
    if(transforms.length > 0) {
      const { key, value } = transforms[transforms.length - 1]
      if(key === 'flip' && value === newvalue) return this.props.onPopTransform()
    }
    this.props.onPushTransform('flip', newvalue)
  }

  _handleRotate(newvalue) {
    const { transforms } = this.props
    if(transforms.length > 0) {
      const { key, value } = transforms[transforms.length - 1]
      if(key === 'rot' && value === (0 - newvalue)) return this.props.onPopTransform()
    }
    this.props.onPushTransform('rot', newvalue)
  }

  _handleBack() {
    this.props.onBack()
  }

}

const mapStateToProps = (state, props) => ({
  transforms: state.maha.image_editor.transforms
})

export default connect(mapStateToProps)(Orientation)
