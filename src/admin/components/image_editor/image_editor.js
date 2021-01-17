import { CSSTransition } from 'react-transition-group'
import ModalPanel from '../modal_panel'
import PropTypes from 'prop-types'
import Sidebar from './sidebar'
import Canvas from './canvas'
import React from 'react'
import Crop from './crop'
import _ from 'lodash'

class ImageEditor extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    asset: PropTypes.object,
    defaultValue: PropTypes.object,
    mode: PropTypes.string,
    ratio: PropTypes.number,
    status: PropTypes.string,
    transforms: PropTypes.array,
    onPopTransform: PropTypes.func,
    onPushTransform: PropTypes.func,
    onSetMode: PropTypes.func,
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
            <Canvas { ...this._getCanvas() } />
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { asset, defaultValue } = this.props
    const { width, height } = asset.metadata
    const ratio = width / height
    this.props.onSetRatio(ratio)
    if(defaultValue) this._handleSet(defaultValue)
  }

  // componentDidUpdate(prevProps) {
  //   const { transforms } = this.props
  //   if(!_.isEqual(transforms, prevProps.transforms)) {
  //     this.props.onChange(transforms)
  //   }
  // }

  _getCanvas() {
    const { asset, canvas, mode, ratio, transforms } = this.props
    return {
      asset,
      canvas,
      mode,
      ratio,
      transforms
    }
  }

  _getCrop() {
    const { asset, ratio, transforms, onPushTransform } = this.props
    return {
      asset,
      ratio,
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
    const { asset, transforms, onPopTransform, onPushTransform, onSetMode, onSetRatio } = this.props
    return {
      asset,
      transforms,
      onPopTransform,
      onPushTransform,
      onSetMode,
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
