import { CSSTransition } from 'react-transition-group'
import ModalPanel from '../modal_panel'
import PropTypes from 'prop-types'
import Sidebar from './sidebar'
import Loader from '../loader'
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
    asset_id: PropTypes.number,
    cropping: PropTypes.bool,
    defaultValue: PropTypes.object,
    height: PropTypes.number,
    ratio: PropTypes.number,
    status: PropTypes.string,
    transforms: PropTypes.object,
    width: PropTypes.number,
    onAdjust: PropTypes.func,
    onCrop: PropTypes.func,
    onFetch: PropTypes.func,
    onSet: PropTypes.func,
    onSetDimensions: PropTypes.func,
    onSetRatio: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleLoad = this._handleLoad.bind(this)
  _handleMeasure = this._handleMeasure.bind(this)

  render() {
    const { cropping, status } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-imageeditor">
          <Sidebar { ...this._getSidebar() } />
          <div className="maha-imageeditor-main">
            { status === 'ready' ?
              <Canvas { ...this._getCanvas() } /> :
              <Loader />
            }
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
    this._handleFetch()
  }

  componentDidUpdate(prevProps) {
    const { asset } = this.props
    if(!_.isEqual(asset, prevProps.asset)) {
      this._handleMeasure()
    }
  }

  _getCanvas() {
    const { asset, cropping, height, ratio, transforms, width } = this.props
    return {
      asset,
      ratio,
      cropping,
      height,
      transforms,
      width
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

  _handleLoad(e) {
    const { width, height } = e.target
    this.props.onSetDimensions(width, height)
  }

  _handleMeasure() {
    const { asset } = this.props
    const img = new Image()
    img.onload = this._handleLoad
    img.src = `/imagecache${asset.path}`
  }

  _handleSet(transforms) {
    this.props.onSet(transforms)
  }

}

export default ImageEditor
