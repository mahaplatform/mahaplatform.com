import ModalPanel from '../../modal_panel'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Orientation extends React.PureComponent {

  static propTypes = {
    transforms: PropTypes.object,
    onAdjust: PropTypes.func,
    onBack: PropTypes.func
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
          { _.chunk(this.orientations, 2).map((row, i) => (
            <div className="maha-imageeditor-row" key={`row_${i}`}>
              { row.map((orientation, j) => (
                <div className="maha-imageeditor-column" key={`cell_${j}`}>
                  <div className="maha-imageeditor-button" onClick={ orientation.handler }>
                    <i className={`fa fa-${ orientation.icon }`} />
                    { orientation.label }
                  </div>
                </div>
              )) }
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

  _handleRotate(degrees) {
    const { transforms } = this.props
    const rot = (transforms.rot || 0) + degrees
    this.props.onAdjust('rot', rot)
  }

  _handleFlip(axis) {
    const { transforms } = this.props
    const flip = transforms.flip ? [...transforms.flip] : []
    const value = axis ? _.xor(flip, [axis]).join('') : axis
    this.props.onAdjust('flip', value)
  }

  _handleBack() {
    this.props.onBack()
  }

}

const mapStateToProps = (state, props) => ({
  transforms: state.maha.image_editor.transforms
})

export default connect(mapStateToProps)(Orientation)
