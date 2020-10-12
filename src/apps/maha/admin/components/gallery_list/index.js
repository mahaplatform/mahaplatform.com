import PropTypes from 'prop-types'
import { Image } from 'maha-admin'
import React from 'react'

class GalleryList extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    attachable_type: PropTypes.string,
    attachable_id: PropTypes.string,
    attachments: PropTypes.array
  }

  render() {
    const { attachments } = this.props
    return (
      <div className="maha-gallery-list">
        { attachments.filter(attachment => {
          return attachment.asset.content_type.match(/(jpeg|jpg|gif|png)/) !== null
        }).map(attachment => (
          <div className="maha-gallery-list-item" key={`gallery_list_item_${attachment.id}`} onClick={ this._handleClick.bind(this, attachment.id) }>
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

  _handleClick(attachment_id) {
    const { attachable_type, attachable_id } = this.props
    const { history } = this.context.router
    history.push(`/${attachable_type}/${attachable_id}/attachments/${attachment_id}`)
  }

}

export default GalleryList
