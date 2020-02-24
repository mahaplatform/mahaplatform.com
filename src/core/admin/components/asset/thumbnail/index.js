import PropTypes from 'prop-types'
import Image from '../../image'
import AssetIcon from '../icon'
import React from 'react'

class AssetThumbnail extends React.Component {

  static propTypes = {
    content_type: PropTypes.string,
    file_name: PropTypes.string,
    file_size: PropTypes.number,
    has_preview: PropTypes.bool,
    id: PropTypes.number,
    original_file_name: PropTypes.string,
    path: PropTypes.string,
    preview: PropTypes.bool,
    status: PropTypes.string,
    thumbnail: PropTypes.string,
    width: PropTypes.number
  }

  static defaultProps = {
    width: 50
  }

  render() {
    const { has_preview, id, file_size, original_file_name, path, thumbnail, width } = this.props
    const previewSrc = has_preview ? `/assets/${id}/preview.jpg` : path
    const content_type = this.props.content_type || 'text/plain'
    if(thumbnail) {
      return (
        <div className="maha-asset-thumbnail">
          <div className="maha-image">
            <img src={ thumbnail } />
          </div>
        </div>
      )
    }
    return (
      <div className="maha-asset-thumbnail">
        { content_type.match(/(jpeg|jpg|gif|png)/) && file_size > 0 ?
          <Image src={ previewSrc } title={ original_file_name } transforms={{ fit: 'cover', h: width, w: width }} /> :
          <AssetIcon content_type={ content_type } />
        }
      </div>
    )
  }

}

export default AssetThumbnail
