import { AssetThumbnail, ModalPanel, Uploader } from '@admin'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class Versions extends React.Component {

  static contextTypes = {
    confirm: PropTypes.object,
    network: PropTypes.object,
    uploader: PropTypes.object
  }

  static propTypes = {
    id: PropTypes.string,
    file: PropTypes.object,
    onFetch: PropTypes.func
  }

  link = null

  _handleBrowse = this._handleBrowse.bind(this)
  _handleRefresh = this._handleRefresh.bind(this)
  _handleUpload = this._handleUpload.bind(this)

  render() {
    const { file } = this.props
    if(!file) return null
    return (
      <div className="drive-versions">
        <div className="drive-upload">
          <div className="ui fluid green button" onClick={ this._handleBrowse }>
            Upload New Version
          </div>
        </div>
        { file.versions.map((version, index) => (
          <div className="drive-version" key={`version_${version.id}`}>
            <div className="drive-version-preview">
              <AssetThumbnail { ...version.asset } />
            </div>
            <div className="drive-version-details">
              <div className="drive-version-text">
                <div className="drive-version-text-version">
                  { version.id === file.version_id ?
                    <span>Current</span> :
                    <span>Version { file.versions.length - index }</span>
                  }
                </div>
                <div className="drive-version-text-filename">
                  { version.asset.original_file_name}
                </div>
              </div>
              <div className="drive-version-meta">
                <div className="drive-version-meta-timestamp">
                  { moment(version.created_at).format('MMM DD, YYYY, h:mm A') }
                </div>
                <div className="drive-version-meta-user">
                  { version.user.full_name }
                </div>
              </div>
              <div className="drive-version-link" onClick={ this._handleView.bind(this, version) }>
                <i className="fa fa-external-link-square" /> <span>View file in another window</span>
              </div>
            </div>
            <div className="drive-version-active">
              { version.id === file.version_id ?
                <i className="fa fa-fw fa-check-circle" /> :
                <i className="fa fa-fw fa-circle-o" onClick={ this._handleRevert.bind(this, version.asset.id, file.versions.length - index)} />
              }
            </div>
          </div>
        )) }
        <a ref={ node => this.link = node } target="_blank" />
      </div>
    )
  }

  componentDidMount() {
    const { id, onFetch } = this.props
    onFetch(id)
  }

  componentDidUpdate(prevProps) {
    const { file } = this.props
    if(file !== prevProps.file && file !== null) {
      this._handleJoin()
    }
  }

  componentWillUnmount() {
    this._handleLeave()
  }

  _handleJoin() {
    const { file } = this.props
    const { network } = this.context
    const target = `/admin/drive/files/${file.code}`
    network.join(target)
    network.subscribe([
      { target, action: 'refresh', handler: this._handleRefresh }
    ])
  }

  _handleLeave() {
    const { file } = this.props
    const { network } = this.context
    const target = `/admin/drive/files/${file.code}`
    network.leave(target)
    network.unsubscribe([
      { target, action: 'refresh', handler: this._handleRefresh }
    ])
  }

  _handleRefresh() {
    const { id, onFetch } = this.props
    onFetch(id)
  }

  _handleBrowse() {
    this.context.uploader.browse(this._handleUpload)
  }

  _handleUpload(asset) {
    const { file } = this.props
    this.context.network.request({
      method: 'PATCH',
      endpoint: `/api/admin/drive/files/${file.code}`,
      body: {
        asset_id: asset.id
      }
    })
  }

  _handleRevert(asset_id, index) {
    const { file } = this.props
    this.context.confirm.open(`Revert to version ${index}?`, () => {
      this.context.network.request({
        method: 'PATCH',
        endpoint: `/api/admin/drive/files/${file.code}`,
        body: {
          asset_id
        }
      })
    })
  }

  _handleView(version) {
    const { file } = this.props
    this.link.href = `/admin/drive/files/${file.code}/versions/${version.id}`
    this.link.click()
  }

}


class VersionsModal extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() } >
        <Uploader>
          <Versions { ...this.props } />
        </Uploader>
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Manage Versions',
      rightItems: [
        { label: 'Done', handler: this._handleDone }
      ]
    }
  }

  _handleDone() {
    this.context.modal.close()
  }

}

export default VersionsModal
