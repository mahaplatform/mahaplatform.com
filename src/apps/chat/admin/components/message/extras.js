import { AssetViewer, AssetToken, Attachment, Link, Gallery } from 'maha-admin'
import QuotedMessage from '../quoted_message'
import PropTypes from 'prop-types'
import React from 'react'

class Extras extends React.Component {

  static propTypes = {
    files: PropTypes.array,
    id: PropTypes.number,
    images: PropTypes.array,
    link: PropTypes.object,
    media: PropTypes.array,
    quoted_message: PropTypes.object
  }

  render() {
    const { files, images, link, media, quoted_message } = this.props
    return (
      <div className="maha-message-extras">
        { quoted_message && <QuotedMessage message={ quoted_message } /> }
        { link && <Link link={ link } /> }
        { images.length > 0 && <Gallery { ...this._getGallery() } /> }
        { media.length > 0 &&
          <div className="maha-medias">
            { media.map((video, index) => (
              <div className="maha-media" key={`video_${index}`} onClick={ this._handleClick.bind(this, video.asset) }>
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
