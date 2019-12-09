import PropTypes from 'prop-types'
import Image from '../image'
import React from 'react'

class Gallery extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    attachable_type: PropTypes.string,
    attachable_id: PropTypes.number,
    images: PropTypes.array,
    onClick: PropTypes.func
  }

  static defaultProps = {
    onClick: () => {}
  }

  _handleClick = this._handleClick.bind(this)

  render() {
    const { images } = this.props
    return (
      <div className={`maha-gallery maha-gallery-${Math.min(images.length, 4)}`} onClick={ this._handleClick }>
        { images.slice(0,4).map((image, index) => (
          <div className="maha-gallery-photo" key={`gallery_photo_${index}`}>
            <Image src={ image.asset.path } transforms={{ fit: 'cover', w: 300, h: 300 }} />
            <img src={ `/admin/images/services/${image.asset.source}.png` } className="maha-gallery-photo-source" />
            { index === 3 && images.length > 4 &&
              <div className="maha-gallery-photo-more" data-count={images.length - 3} />
            }
          </div>
        ))}
      </div>
    )
  }

  _handleClick() {
    const { attachable_type, attachable_id } = this.props
    this.context.router.history.push(`/admin/attachments/${attachable_type}/${attachable_id}`)
  }

}

export default Gallery
