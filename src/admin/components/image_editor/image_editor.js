import { CSSTransition } from 'react-transition-group'
import ModalPanel from '../modal_panel'
import PropTypes from 'prop-types'
import Sidebar from './sidebar'
import Buttons from '../buttons'
import Canvas from './canvas'
import Crop from './crop'
import React from 'react'

class ImageEditor extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    asset: PropTypes.object,
    canvas: PropTypes.object,
    crop: PropTypes.object,
    cropping: PropTypes.bool,
    defaultValue: PropTypes.object,
    image: PropTypes.object,
    orientation: PropTypes.object,
    ratio: PropTypes.number,
    scaled: PropTypes.object,
    status: PropTypes.string,
    transforms: PropTypes.array,
    undone: PropTypes.array,
    viewport: PropTypes.object,
    onCrop: PropTypes.func,
    onPopTransform: PropTypes.func,
    onPushTransform: PropTypes.func,
    onRedo: PropTypes.func,
    onReset: PropTypes.func,
    onSetRatio: PropTypes.func,
    onUndo: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {}
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    const { cropping } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-imageeditor">
          <Sidebar { ...this._getSidebar() } />
          <div className="maha-imageeditor-main">
            <Canvas { ...this._getCanvas() } />
            <CSSTransition in={ cropping } classNames="fadein" timeout={ 500 } mountOnEnter={ true } unmountOnExit={ true }>
              <Crop { ...this._getCrop() } />
            </CSSTransition>
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
    const { asset, canvas, crop, image, orientation, scaled, transforms, undone, viewport, onRedo, onReset, onUndo } = this.props
    return {
      asset,
      canvas,
      crop,
      image,
      scaled,
      undone,
      viewport,
      orientation,
      transforms,
      onRedo,
      onReset,
      onUndo
    }
  }

  _getCrop() {
    const { asset, canvas, image, orientation, ratio, transforms, onCrop, onPushTransform } = this.props
    return {
      asset,
      canvas,
      image,
      ratio,
      orientation,
      transforms,
      onCrop,
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
    const { asset, canvas, crop, cropping, image, orientation, ratio, transforms, onCrop, onPopTransform, onPushTransform, onSetRatio } = this.props
    return {
      asset,
      canvas,
      crop,
      cropping,
      image,
      orientation,
      ratio,
      transforms,
      onCrop,
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
