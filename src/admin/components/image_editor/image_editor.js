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
    defaultValue: PropTypes.object,
    mode: PropTypes.string,
    status: PropTypes.string,
    transforms: PropTypes.array,
    onPopTransform: PropTypes.func,
    onPushTransform: PropTypes.func,
    onSetRatio: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {}
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-imageeditor">
          <Sidebar { ...this._getSidebar() } />
          <div className="maha-imageeditor-main">
            <div className="maha-imageeditor-header">
              undo
            </div>
            <div className="maha-imageeditor-body">
              <Canvas { ...this._getCanvas() } />
            </div>
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) this._handleSet(defaultValue)
  }

  // componentDidUpdate(prevProps) {
  //   const { transforms } = this.props
  //   if(!_.isEqual(transforms, prevProps.transforms)) {
  //     this.props.onChange(transforms)
  //   }
  // }

  _getCanvas() {
    const { asset, mode, transforms } = this.props
    return {
      asset,
      mode,
      transforms
    }
  }

  _getCrop() {
    const { asset, transforms, onPushTransform } = this.props
    return {
      asset,
      transforms,
      onPushTransform
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
    const { asset, transforms, onPopTransform, onPushTransform, onSetRatio } = this.props
    return {
      asset,
      transforms,
      onPopTransform,
      onPushTransform,
      onSetRatio
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleDone() {
    this.context.modal.close()
  }

  _handleSet(transforms) {
    this.props.onSet(transforms)
  }

}

export default ImageEditor
