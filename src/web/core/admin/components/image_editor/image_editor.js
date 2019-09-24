import ModalPanel from '../modal_panel'
import PropTypes from 'prop-types'
import Sidebar from './sidebar'
import Canvas from './canvas'
import React from 'react'
import Crop from './crop'

class ImageEditor extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    asset: PropTypes.object,
    asset_id: PropTypes.number,
    cropping: PropTypes.bool,
    defaultValue: PropTypes.object,
    ratio: PropTypes.number,
    status: PropTypes.string,
    transforms: PropTypes.object,
    onAdjust: PropTypes.func,
    onCrop: PropTypes.func,
    onFetch: PropTypes.func,
    onSet: PropTypes.func,
    onSetRatio: PropTypes.func
  }

  static defaultProps = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    const { cropping, status } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-imageeditor">
          <Sidebar { ...this._getSidebar() } />
          <div className="maha-imageeditor-main">
            { status === 'loaded' &&
              <Canvas { ...this._getCanvas() } />
            }
            { cropping &&
              <Crop { ...this._getCrop() } />
            }
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) this._handleSet(defaultValue)
    this._handleFetch()
  }

  _getCanvas() {
    const { asset, cropping, ratio, transforms } = this.props
    return {
      asset,
      ratio,
      cropping,
      transforms
    }
  }

  _getCrop() {
    const { asset, ratio, onAdjust } = this.props
    return {
      asset,
      ratio,
      onAdjust
    }
  }

  _getPanel() {
    return {
      title: 'Photo Editor',
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ],
      rightItems: [
        { label: 'Done', handler: this._handleDone }
      ]
    }
  }

  _getSidebar() {
    const { onAdjust, onCrop, onSetRatio } = this.props
    return {
      onAdjust,
      onCrop,
      onSetRatio
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleDone() {
    this.context.modal.close()
  }

  _handleFetch() {
    const { asset_id, onFetch } = this.props
    onFetch(asset_id)
  }

  _handleSet({ asset_id, transforms }) {
    this.props.onSet(asset_id, transforms)
  }

}

export default ImageEditor
