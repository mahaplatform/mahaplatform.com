import PropTypes from 'prop-types'
import AssetIcon from './icon'
import Image from '../image'
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
    status: PropTypes.string
  }

  render() {
    const { content_type, has_preview, id, file_size, original_file_name, path } = this.props
    const previewSrc = has_preview ? `/assets/${id}/preview.jpg` : path
    if(!content_type) return null
    return (
      <div className="maha-asset-thumbnail">
        { content_type.match(/image/) && file_size > 0 ?
          <Image src={ previewSrc } title={ original_file_name } transforms={{ fit: 'cover', h: 50, w: 50 }} /> :
          <AssetIcon content_type={ content_type } />
        }
      </div>
    )
  }

}

export default AssetThumbnail
