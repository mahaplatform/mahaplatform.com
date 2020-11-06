import Message from '../../message'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class AssetViewer extends React.Component {

  static propTypes = {
    asset: PropTypes.object
  }

  render() {
    const { asset } = this.props
    const viewer = this._getViewer(asset)
    if(asset.status && asset.status !== 'processed') {
      return (
        <div className={ this._getClass() }>
          <div className="maha-asset-viewer-body">
            <Message { ...this._getProcesssing() } />
          </div>
        </div>
      )
    }
    if(viewer) {
      return (
        <div className={ this._getClass() }>
          <div className="maha-asset-viewer-body">
            <iframe allowFullScreen frameBorder="0" src={ viewer } />
          </div>
        </div>
      )
    }
    return (
      <div className={ this._getClass() }>
        <div className="maha-asset-viewer-body">
          <Message { ...this._getMessage() } />
        </div>
      </div>
    )
  }

  _getClass() {
    const type = this._getType()
    const classes = ['maha-asset-viewer']
    classes.push(type)
    return classes.join(' ')
  }

  _getProcesssing() {
    return {
      icon: 'circle-o-notch fa-spin',
      title: 'Preview unavailable',
      text: 'We\'re currently processing this item. Please check back later.'
    }
  }

  _getMessage() {
    const { asset } = this.props
    return {
      icon: this._getIcon(),
      text: asset.file_name,
      button: {
        label: 'Download File',
        handler: () => {}
      }
    }
  }

  _getIcon(content_type) {
    const type = this._getType()
    if(type === 'image') return 'picture-o'
    if(type === 'audio') return 'volume-up'
    if(type === 'video') return 'video-camera'
    if(type === 'pdf') return 'file-pdf-o'
    if(type === 'excel') return 'file-excel-o'
    if(type === 'word') return 'file-word-o'
    if(type === 'powerpoint') return 'file-powerpoint-o'
    return 'file-text-o'
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

  _getViewer() {
    const { asset } = this.props
    const host = this._getHost()
    const url = asset.signed_url || `${host}/${asset.path}`
    const file = encodeURIComponent(url)
    const type = this._getType()
    if(type === 'pdf') return `/doc.html?file=${file}`
    if(type === 'word') return `/doc.html?file=${file}`
    if(type === 'powerpoint') return `/doc.html?file=${file}`
    if(type === 'excel') return `/doc.html?file=${file}`
    if(type === 'audio') return `/audio.html?file=${file}`
    if(type === 'video') return `/video.html?file=${file}`
    if(type === 'image') return `/image.html?file=${file}`
    if(_.includes(['text','html'], type)) return url
    return null
  }

  _getType() {
    const { content_type } = this.props.asset
    if(content_type.match(/(jpeg|jpg|gif|png)/)) return 'image'
    if(content_type.match(/audio/)) return 'audio'
    if(content_type.match(/video/)) return 'video'
    if(content_type.match(/pdf/)) return 'pdf'
    if(content_type.match(/excel/)) return 'excel'
    if(content_type.match(/spreadsheetml/)) return 'excel'
    if(content_type.match(/msword/)) return 'word'
    if(content_type.match(/wordprocessingml/)) return 'word'
    if(content_type.match(/powerpoint/)) return 'powerpoint'
    if(content_type.match(/presentationml/)) return 'powerpoint'
    if(content_type.match(/html/)) return 'html'
    if(content_type.match(/plain/)) return 'text'
  }

}

export default AssetViewer
