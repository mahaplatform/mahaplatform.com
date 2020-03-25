import { AssetViewer, AssetToken, Attachment, Gallery } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Extras extends React.Component {

  static propTypes = {
    files: PropTypes.array,
    id: PropTypes.number,
    images: PropTypes.array,
    media: PropTypes.array
  }

  render() {
    const { files, images, media } = this.props
    return (
      <div className="maha-message-extras">
        { images.length > 0 && <Gallery { ...this._getGallery() } /> }
        { media.length > 0 &&
          <div className="maha-medias">
            { media.map((video, index) => (
              <div className="maha-media" key={`video_${index}`}>
                <AssetViewer asset={ video.asset } />
                <AssetToken { ...video.asset } />
              </div>
            ))}
          </div>
        }
        { files.length > 0 &&
          <div className="maha-files">
            { files.map((file, index) => (
              <div className="maha-files-file" key={`file_${index}`}>
                <Attachment { ...file } />
              </div>
            ))}
          </div>
        }
      </div>
    )
  }

  _getGallery() {
    const { id, images } = this.props
    return {
      images,
      attachable_type: 'chat_messages',
      attachable_id: id
    }
  }

}

export default Extras
