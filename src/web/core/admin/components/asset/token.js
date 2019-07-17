import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AssetIcon from './icon'
import print from 'print-js'
import Image from '../image'
import React from 'react'
import bytes from 'bytes'

class AssetToken extends React.Component {

  static propTypes = {
    content_type: PropTypes.string,
    download: PropTypes.bool,
    file_name: PropTypes.string,
    file_size: PropTypes.number,
    has_preview: PropTypes.bool,
    id: PropTypes.number,
    original_file_name: PropTypes.string,
    path: PropTypes.string,
    preview: PropTypes.bool,
    signed_url: PropTypes.string,
    source: PropTypes.string,
    source_url: PropTypes.string,
    token: PropTypes.string,
    onClick: PropTypes.func
  }

  static defaultProps = {
    download: true,
    preview: false
  }

  _handleClick = this._handleClick.bind(this)
  _handleDownload = this._handleDownload.bind(this)
  _handlePrint = this._handlePrint.bind(this)

  render() {
    const { content_type, original_file_name, file_size, has_preview, id, path, preview, source, source_url } = this.props
    const previewSrc = has_preview ? `/assets/${id}/preview.jpg` : path
    return (
      <div className={ this._getClass() } onClick={ this._handleClick }>
        <div className="maha-asset-token-details">
          <div className="maha-asset-token-icon">
            <AssetIcon content_type={ content_type } />
            <div className="maha-asset-token-badge">
              <img src={ `/admin/images/${source}.png` } />
            </div>
          </div>
          <div className="maha-asset-token-text">
            <div className="maha-asset-token-filename">
              { original_file_name }
            </div>
            <div className="maha-asset-token-filesize">
              { bytes(file_size) }
            </div>
            <div className="maha-asset-token-links">
              <div className="maha-asset-token-link" onClick={ this._handleDownload }>
                Download
              </div>
              <span>|</span>
              <div className="maha-asset-token-link" onClick={ this._handlePrint }>
                Print
              </div>
              { source_url && <span>|</span> }
              { source_url &&
                <div className="maha-asset-token-link" onClick={ this._handleEdit.bind(this, source_url) }>
                  { source === 'google' && 'Open in Google Drive' }
                  { source === 'microsoft' && 'Open in OneDrive' }
                  <a href={ source_url } rel="noopener noreferrer" target="_blank" ref={ node => this.link = node } />
                </div>
              }
            </div>
          </div>
        </div>
        { preview &&
          <div className="maha-asset-token-preview">
            <div className="maha-asset-token-preview-frame">
              <Image src={ previewSrc } title={ original_file_name } transforms={{ h: 300 }} />
            </div>
          </div>
        }
      </div>
    )
  }

  _getClass() {
    const { file_name, onClick } = this.props
    const classes = ['maha-asset-token']
    classes.push(file_name.split('.').pop().substr(0, 3))
    if(onClick) classes.push('link')
    return classes.join(' ')
  }

  _getPrint() {
    const { id, content_type, signed_url, token } = this.props
    if(content_type.match(/image/) !== null) {
      return {
        printable: signed_url,
        type: 'image'
      }
    } else if(content_type.match(/pdf/) !== null) {
      return {
        printable: signed_url,
        type: 'pdf'
      }
    } else {
      return {
        printable: `/api/admin/assets/${id}/print?token=${token}`,
        type: 'pdf'
      }

    }
  }
  
  _handleClick() {
    const { onClick } = this.props
    if(onClick) return onClick()
  }

  _handleDownload(e) {
    e.stopPropagation()
    const { download, id, token } = this.props
    if(!download) return
    window.location.href = `/api/admin/assets/${id}/download?token=${token}`
  }

  _handleEdit(url, e) {
    this.link.href = url
    this.link.click()
    e.stopPropagation()
  }

  _handlePrint() {
    const params = this._getPrint()
    print(params)
  }

}

const mapStateToProps = (state, props) => ({
  token: state.maha.admin.team.token
})

export default connect(mapStateToProps)(AssetToken)
