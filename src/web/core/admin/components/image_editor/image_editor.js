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
    cropping: PropTypes.bool,
    defaultValue: PropTypes.object,
    ratio: PropTypes.number,
    status: PropTypes.string,
    transforms: PropTypes.object,
    onAdjust: PropTypes.func,
    onChange: PropTypes.func,
    onCrop: PropTypes.func,
    onSet: PropTypes.func,
    onSetRatio: PropTypes.func
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
            <Canvas { ...this._getCanvas() } /> :
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
    const ratio = _.get(defaultValue, 'crop.ra')
    if(defaultValue) this._handleSet(defaultValue)
    if(ratio) this.props.onSetRatio(ratio)
  }

  componentDidUpdate(prevProps) {
    const { transforms } = this.props
    if(!_.isEqual(transforms, prevProps.transforms)) {
      this.props.onChange(transforms)
    }
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
    const { asset, ratio, transforms, onAdjust } = this.props
    return {
      asset,
      ratio,
      transforms,
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
    const { asset, onAdjust, onCrop, onSetRatio } = this.props
    return {
      asset,
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

  _handleSet(transforms) {
    this.props.onSet(transforms)
  }

}

export default ImageEditor
