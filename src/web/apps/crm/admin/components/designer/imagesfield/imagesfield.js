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
    onSet: PropTypes.func
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
              image<br />
              <Button { ...this._getEdit(image) } />
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
      label: 'Add Images',
      className: 'imagefield-add',
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

  _getEdit(image) {
    console.log(image)
    return {
      label: 'edit',
      className: 'link',
      modal: <ImageEditor { ...image } />
    }
  }

  _handleAdd(assets) {
    this.props.onAdd(assets.map(asset => ({
      asset_id: asset.id,
      transforms: {}
    })))
  }

}

export default Imagesfield
