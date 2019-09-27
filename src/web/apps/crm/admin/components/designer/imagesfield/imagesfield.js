import { Attachments, Button, ImageEditor } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Imagesfield extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    defaultValue: PropTypes.array,
    images: PropTypes.array,
    onAdd: PropTypes.func,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onRemove: PropTypes.func,
    onSet: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  _handleAdd = this._handleAdd.bind(this)

  render() {
    const { images } = this.props
    return (
      <div className="imagesfield">
        { images.map((image, index) => (
          <div className="imagesfield-image" key={`image_${index}`}>
            <div className="imagesfield-image-image">
              <img src="http://localhost:8080/imagecache/fit=cover&w=50&h=50/assets/8117/fairfax-bridge-crop-0.jpg" />
            </div>
            <div className="imagesfield-image-details">
              narrow-bridge.jpg<br />
              <Button { ...this._getEdit(image, index) } /> | <Button { ...this._getRemove(index) } />
            </div>
          </div>
        )) }
        <Button { ...this._getAdd() } />
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onSet } = this.props
    if(defaultValue) onSet(defaultValue)
    this.props.onReady()
  }

  componentDidUpdate(prevProps) {
    const { images } = this.props
    if(!_.isEqual(images, prevProps.images)) {
      this.props.onChange(images)
    }
  }

  _getAdd() {
    return {
      label: <span><i className="fa fa-plus" />Add Image(s)</span>,
      className: 'imagesfield-add',
      modal: <Attachments { ...this._getAttachments() } />
    }
  }

  _getAttachments() {
    return {
      multiple: true,
      type: 'photos',
      onChooseAssets: this._handleAdd
    }
  }

  _getEdit(image, index) {
    return {
      label: 'edit',
      className: 'link',
      modal: <ImageEditor { ...this._getImage(image, index) } />
    }
  }

  _getImage(image, index) {
    return {
      asset_id: image.asset_id,
      defaultValue: image.transforms,
      onChange: this._handleUpdate.bind(this, index)
    }
  }

  _getRemove(index) {
    return {
      label: 'remove',
      className: 'link',
      handler: this._handleRemove.bind(this, index)
    }
  }

  _handleAdd(assets) {
    this.props.onAdd(assets.map(asset => ({
      asset_id: asset.id,
      transforms: {}
    })))
  }

  _handleRemove(index) {
    this.props.onRemove(index)
  }

  _handleUpdate(index, transforms) {
    this.props.onUpdate(index, transforms)
  }

}

export default Imagesfield
