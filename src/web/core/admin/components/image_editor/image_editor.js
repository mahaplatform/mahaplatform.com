import ModalPanel from '../modal_panel'
import PropTypes from 'prop-types'
import Sidebar from './sidebar'
import Canvas from './canvas'
import React from 'react'

class ImageEditor extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    asset: PropTypes.object,
    asset_id: PropTypes.number,
    defaultValue: PropTypes.object,
    status: PropTypes.string,
    transforms: PropTypes.object,
    onAdjust: PropTypes.func,
    onFetch: PropTypes.func,
    onSet: PropTypes.func
  }

  static defaultProps = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    const { status } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-imageeditor">
          <Sidebar { ...this._getSidebar() } />
          { status === 'loaded' &&
            <Canvas { ...this._getCanvas() } />
          }
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) this._handleSet(defaultValue)
  }

  componentDidUpdate(prevProps) {
    const { asset_id } = this.props
    if(asset_id !== prevProps.asset_id) {
      this._handleFetch()
    }
  }

  _getCanvas() {
    const { asset, transforms } = this.props
    return {
      asset,
      transforms
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
    const { transforms, onAdjust } = this.props
    return {
      transforms,
      onAdjust
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
