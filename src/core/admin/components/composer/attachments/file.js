import { AssetIcon } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class ImageAttachment extends React.Component {

  static propTypes = {
    file: PropTypes.object,
    onRemove: PropTypes.func
  }

  _handleRemove = this._handleRemove.bind(this)

  render() {
    const { file } = this.props
    return (
      <div className="maha-composer-file">
        <div className="maha-composer-file-detail">
          <div className="maha-composer-file-icon">
            <AssetIcon { ...this._getAssetIcon() } />
          </div>
          <div className="maha-composer-file-name">
            { this._getFileName() }
          </div>
          { !file.id ?
            <div><i className="fa fa-fw fa-circle-o-notch fa-spin" /></div> :
            <i className="fa fa-fw fa-times" onClick={ this._handleRemove } />
          }
        </div>
      </div>
    )
  }

  _getAssetIcon() {
    const { file } = this.props
    return {
      content_type: file.content_type || 'plain/text',
      source: 'device'
    }
  }

  _getFileName() {
    const { file } = this.props
    return file.file_name || file.file.fileName
  }

  _handleRemove() {
    this.props.onRemove()
  }

}

export default ImageAttachment
