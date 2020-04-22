import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Popup extends React.Component {

  static propTypes = {
    asset: PropTypes.object
  }

  render() {
    return (
      <div className="maha-help-article-popup">
        <iframe { ...this._getIframe() } />
      </div>
    )
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

  _getIframe() {
    const { asset } = this.props
    const host = this._getHost()
    const url = asset.signed_url || `${host}/${asset.path}`
    const file = encodeURIComponent(url)
    return {
      allowFullScreen: true,
      frameBorder: 0,
      src: `/admin/video.html?file=${file}&autoplay=true`
    }
  }

}

export default Popup
