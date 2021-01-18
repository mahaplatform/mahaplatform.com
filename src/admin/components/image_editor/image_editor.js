import ModalPanel from '../modal_panel'
import PropTypes from 'prop-types'
import Sidebar from './sidebar'
import Buttons from '../buttons'
import Canvas from './canvas'
import React from 'react'

class ImageEditor extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    asset: PropTypes.object,
    canvas: PropTypes.object,
    crop: PropTypes.object,
    defaultValue: PropTypes.object,
    image: PropTypes.object,
    orientation: PropTypes.object,
    scaled: PropTypes.object,
    status: PropTypes.string,
    transforms: PropTypes.array,
    undone: PropTypes.array,
    viewport: PropTypes.object,
    onPopTransform: PropTypes.func,
    onPushTransform: PropTypes.func,
    onRedo: PropTypes.func,
    onReset: PropTypes.func,
    onUndo: PropTypes.func
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
              <Buttons  { ...this._getButtons()} />
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
    const { asset, canvas, crop, image, orientation, scaled, transforms, viewport } = this.props
    return {
      asset,
      canvas,
      crop,
      image,
      scaled,
      viewport,
      orientation,
      transforms
    }
  }

  _getButtons() {
    const { transforms, undone, onRedo, onReset, onUndo } = this.props
    return {
      buttons: [
        {
          label: 'Reset',
          size: 'tiny',
          color: 'blue',
          disabled: transforms.length === 0,
          handler: onReset
        }, {
          label: 'Undo',
          size: 'tiny',
          color: 'blue',
          disabled: transforms.length === 0,
          handler: onUndo
        }, {
          label: 'Redo',
          size: 'tiny',
          color: 'blue',
          disabled: undone.length == 0,
          handler: onRedo
        }
      ]
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
    const { asset, canvas, crop, image, orientation, transforms, onPopTransform, onPushTransform } = this.props
    return {
      asset,
      canvas,
      crop,
      image,
      orientation,
      transforms,
      onPopTransform,
      onPushTransform
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
