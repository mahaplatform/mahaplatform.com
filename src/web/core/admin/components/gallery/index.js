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
      <div className={`maha-gallery maha-gallery-${images.length}`} onClick={ this._handleClick }>
        { images.map((image, index) => (
          <div className="maha-gallery-photo" key={`gallery_photo_${image.asset.id}`}>
            <Image src={ image.asset.path } transforms={{ fit: 'cover', w: 300, h: 300 }} title={ image.caption } />
            <img src={ `/admin/images/${image.asset.source}.png` } className="maha-gallery-photo-source" />
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
