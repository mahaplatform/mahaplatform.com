import './style.less'
import RichText from '../../richtext'
import Style from '../../style'
import React, { useState } from 'react'

function VideoBlock({ children, config }) {

  const [playable, setPlayable] = useState(false)

  const _getIframe = (config) => {
    return {
      src: _getAutoplayUrl(config),
      frameBorder: 0,
      allowFullScreen: true
    }
  }

  const _handleClick = () => {
    if(playable) return
    setPlayable(true)
  }

  const _getAutoplayUrl = ({ video_url }) => {
    const [,path,query] = video_url.match(/([^?]*)\??(.*)?/)
    const newquery = [
      ...(query || '').split('&'),
      'modestbranding=1',
      'autoplay=1'
    ]
    return `${path}?${newquery.join('&')}`
  }

  return (
    <div className="maha-video">
      <div className="maha-video-frame">
        <div className="maha-video-player">
          <iframe { ..._getIframe(config) } />
        </div>
      </div>
      <div className="maha-video-caption" style={ Style(null, config.caption_style) }>
        { RichText(config.caption, config.caption_style) }
      </div>
    </div>
  )
}

export default VideoBlock
