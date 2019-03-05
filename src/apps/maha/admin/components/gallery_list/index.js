import PropTypes from 'prop-types'
import Image from '../image'
import React from 'react'

class GalleryList extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    attachments: PropTypes.array
  }

  render() {
    const { attachments } = this.props
    return (
      <div className="maha-gallery-list">
        { attachments.map(attachment => (
          <div className="maha-gallery-list-item" key={`gallery_list_item_${attachment.id}`} onClick={ this._handleClick.bind(this, attachment.asset) }>
            <div className="maha-gallery-list-item-photo">
              <Image src={ attachment.asset.path } transforms={{ w: 500 }} />
            </div>
            { attachment.caption &&
              <div className="maha-gallery-list-item-caption">
                { attachment.caption }
              </div>
            }
          </div>
        ))}
      </div>
    )
  }

  _handleClick(asset) {
    this.context.router.push(`/admin/assets/${asset.id}`)

  }

}

export default GalleryList
