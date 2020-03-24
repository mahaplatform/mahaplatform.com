import PropTypes from 'prop-types'
import Image from './image'
import React from 'react'

class Attachments extends React.Component {

  static propTypes = {
    images: PropTypes.array,
    onRemove: PropTypes.func
  }

  _handleAdd = this._handleAdd.bind(this)

  render() {
    const { images } = this.props
    return (
      <div className={`maha-composer-gallery maha-composer-gallery-${Math.min(images.length, 4)}`}>
        { images.slice(0,4).map((image, index) => (
          <div className="maha-composer-gallery-item" key={`image_${index}`}>
            <Image { ...this._getImage(image, index) } />
            { index === 3 && images.length > 4 &&
              <div className="maha-composer-gallery-more" data-count={images.length - 3} />
            }
          </div>
        ))}
      </div>
    )
  }

  _getImage(image, index) {
    return {
      image,
      onRemove: this._handleRemove.bind(this, index)
    }
  }

  _handleRemove(index) {
    this.props.onRemove(index)
  }

}

export default Attachments
