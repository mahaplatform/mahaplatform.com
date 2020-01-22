import { Attachments, Button } from 'maha-admin'
// import { ImageEditor } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Imagesfield extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    defaultValue: PropTypes.array,
    images: PropTypes.array,
    status: PropTypes.string,
    onAdd: PropTypes.func,
    onChange: PropTypes.func,
    onFetch: PropTypes.func,
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
  _handleChange = this._handleChange.bind(this)
  _handleSet = this._handleSet.bind(this)
  _handleFetch = this._handleFetch.bind(this)

  render() {
    const { images, status } = this.props
    if(status !== 'ready') return null
    return (
      <div className="imagesfield">
        { images.map((image, index) => (
          <div className="imagesfield-image" key={`image_${index}`}>
            <div className="imagesfield-image-image">
              <img src={`/imagecache/fit=cover&w=50&h=50/${image.asset.path}`} />
            </div>
            <div className="imagesfield-image-details">
              { image.asset.original_file_name }<br />
              { false &&
                <Button { ...this._getEdit(image, index) } />
              }
              <Button { ...this._getRemove(index) } />
            </div>
          </div>
        )) }
        { images.length === 0 &&
          <Button { ...this._getAdd() } />
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    const images = defaultValue || []
    this._handleSet(images)
  }

  componentDidUpdate(prevProps) {
    const { images, status } = this.props
    if(status !== prevProps.status) {
      if(status === 'initialized') {
        this._handleFetch()
      }
      if(status === 'ready') {
        this.props.onReady()
      }
    }
    if(!_.isEqual(images, prevProps.images)) {
      this._handleChange()
    }
  }

  _getAdd() {
    return {
      label: <span><i className="fa fa-plus" />Add Image</span>,
      className: 'imagesfield-add',
      modal: <Attachments { ...this._getAttachments() } />
    }
  }

  _getAttachments() {
    return {
      multiple: false,
      type: 'photos',
      onChooseAssets: this._handleAdd
    }
  }

  // _getEdit(image, index) {
  //   return {
  //     label: 'edit',
  //     className: 'link',
  //     modal: <ImageEditor { ...this._getImage(image, index) } />
  //   }
  // }

  _getImage(image, index) {
    return {
      asset: image.asset,
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
      asset,
      transforms: {}
    })))
  }

  _handleChange() {
    const { images } = this.props
    this.props.onChange(images.map(image => ({
      asset: {
        id: image.asset.id,
        path: image.asset.path
      },
      transforms: image.transforms
    })))
  }

  _handleFetch() {
    const { images } = this.props
    this.props.onFetch(images.map(image => {
      return image.asset.id
    }))
  }

  _handleRemove(index) {
    this.props.onRemove(index)
  }

  _handleSet(images) {
    const { onSet } = this.props
    return onSet(images.map(image => ({
      asset: {
        id: image.asset.id
      },
      transforms: image.transforms
    })))
  }

  _handleUpdate(index, transforms) {
    this.props.onUpdate(index, transforms)
  }

}

export default Imagesfield
