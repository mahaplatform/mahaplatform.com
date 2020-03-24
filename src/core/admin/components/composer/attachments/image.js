import ImagePreview from '../../image_preview'
import PropTypes from 'prop-types'
import Image from '../../image'
import React from 'react'

class ImageAttachment extends React.Component {

  static propTypes = {
    image: PropTypes.object,
    onRemove: PropTypes.func
  }

  _handleRemove = this._handleRemove.bind(this)

  render() {
    const { image } = this.props
    return (
      <div className="maha-composer-image">
        { image.file ?
          <ImagePreview { ...this._getImagePreview() } /> :
          <Image { ...this._getImage() } />
        }
        { !image.id ?
          <div><i className="fa fa-fw fa-circle-o-notch fa-spin" /></div> :
          <i className="fa fa-fw fa-times" onClick={ this._handleRemove } />
        }
      </div>
    )
  }

  _getImagePreview() {
    const { image } = this.props
    return {
      image: image.file,
      cover: true
    }
  }

  _getImage() {
    const { image } = this.props
    return {
      src: image.path,
      transforms: {
        fit: 'cover',
        w: 100,
        h: 100
      }
    }
  }

  _handleRemove() {
    this.props.onRemove()
  }

}

export default ImageAttachment
