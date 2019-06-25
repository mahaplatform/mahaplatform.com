import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Device extends React.Component {

  static contextTypes = {
    uploader: PropTypes.object
  }

  static propTypes = {
    files: PropTypes.array,
    onAddAsset: PropTypes.func,
    onAddFile: PropTypes.func,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  drop = null

  _handleBrowse = this._handleBrowse.bind(this)
  _handleFile = this._handleFile.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-attachments-device">
          <div className="maha-attachments-device-body">
            <div className="maha-attachments-device-drop" ref={ (node) => this.drop = node }>
              <div className="maha-attachments-device-text">
                <p>Drop Files Here</p>
                <span>or</span>
                <div className="ui red button" onClick={ this._handleBrowse }>
                  Choose file(s)
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    this.context.uploader.assignDrop(this.drop, this._handleFile)
  }

  _getPanel() {
    const { files } = this.props
    const panel = {
      title: 'Choose File(s)',
      leftItems: [
        { icon: 'chevron-left', handler: this.props.onBack  }
      ]
    }
    if( files.length > 0 ){
      panel.rightItems = [
        { label: 'Done', handler: this.props.onDone }
      ]
    }
    return panel
  }

  _getHost() {
    const hosts = [
      process.env.DATA_ASSET_CDN_HOST,
      process.env.DATA_ASSET_HOST
    ]
    return hosts.reduce((found, host) => {
      if(found) return found
      return !_.isEmpty(host) ? host : null
    }, null) || ''
  }

  _handleBrowse() {
    this.context.uploader.browse(this._handleFile)
  }

  _handleFile(asset) {
    const { onAddFile } = this.props
    onAddFile({
      id: asset.id,
      name: asset.original_file_name,
      network: 'device',
      content_type: asset.content_type,
      thumbnail: asset.content_type.match(/image/) ? asset.signed_url : null,
      asset
    })
  }


}

export default Device
