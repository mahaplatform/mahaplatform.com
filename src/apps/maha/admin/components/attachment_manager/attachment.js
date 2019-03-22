import AssetIcon from '../asset/icon'
import ImagePreview from '../image_preview'
import PropTypes from 'prop-types'
import Image from '../image'
import React from 'react'

class Attachment extends React.Component {

  static propTypes = {
    attachment: PropTypes.object,
    transforms: PropTypes.object,
    onClick: PropTypes.func,
    onRemove: PropTypes.func
  }

  static defaultProps = {
    transforms: { fit: 'contain', w: 300, h: 300 },
    onClick: () => {}
  }

  _handleClick = this._handleClick.bind(this)
  _handleRemove = this._handleRemove.bind(this)

  render() {
    const { attachment, transforms, onRemove } = this.props
    const is_image = attachment.asset.content_type.match(/image/)
    if(!attachment.asset) return null
    return (
      <div { ...this._getThumbnail() }>
        { !is_image &&
          <div className="maha-attachment-manager-thumbnail-document">
            <div className="maha-attachment-manager-thumbnail-document-inner">
              <div className="maha-attachment-manager-thumbnail-document-content">
                <AssetIcon { ...attachment.asset } />
                <div className="maha-attachment-manager-thumbnail-document-label">
                  { attachment.asset.file_name }
                </div>
              </div>
            </div>
          </div>
        }
        { is_image && attachment.asset.file &&
          <ImagePreview image={ attachment.asset } />
        }
        { is_image && !attachment.asset.file &&
          <Image src={ attachment.asset.path } transforms={ transforms } />
        }
        { attachment.asset.status !== 'processed' &&
          <div className="maha-attachment-manager-thumbnail-loader">
            <i className="fa fa-spin fa-circle-o-notch" />
          </div>
        }
        { onRemove &&
          <div className="maha-attachment-manager-thumbnail-remove" onClick={ this._handleRemove }>
            <i className="fa fa-fw fa-times" />
          </div>
        }
      </div>
    )
  }

  _getThumbnail() {
    return {
      className: 'maha-attachment-manager-thumbnail',
      onClick: this._handleClick
    }
  }

  _handleClick() {
    this.props.onClick()
  }

  _handleRemove(e) {
    this.props.onRemove()
    e.stopPropagation()
  }

}

export default Attachment
