import PropTypes from 'prop-types'
import React from 'react'

class AssetIcon extends React.Component {

  static propTypes = {
    content_type: PropTypes.string
  }

  render() {
    return (
      <div className="maha-asset-icon">
        <i className={`fa fa-fw fa-${this._getIcon()}`} />
      </div>
    )
  }

  _getIcon() {
    const { content_type } = this.props
    if(content_type.match(/image/)) return 'file-image-o'
    if(content_type.match(/drawing/)) return 'file-image-o'
    if(content_type.match(/audio/)) return 'file-audio-o'
    if(content_type.match(/video/)) return 'file-video-o'
    if(content_type.match(/pdf/)) return 'file-pdf-o'
    if(content_type.match(/excel/)) return 'file-excel-o'
    if(content_type.match(/spreadsheet/)) return 'file-excel-o'
    if(content_type.match(/msword/)) return 'file-word-o'
    if(content_type.match(/powerpoint/)) return 'file-powerpoint-o'
    if(content_type.match(/presentation/)) return 'file-powerpoint-o'
    if(content_type.match(/wordprocessing/)) return 'file-word-o'
    if(content_type.match(/document/)) return 'file-word-o'
    if(content_type.match(/map/)) return 'map-o'
    if(content_type.match(/zip/)) return 'file-archive-o'
    if(content_type.match(/xml/)) return 'file-code-o'
    if(content_type.match(/html/)) return 'file-code-o'
    return 'file-text-o'
  }

}

export default AssetIcon
