import './style.less'
import RichText from '../../richtext'
import Style from '../../style'
import React from 'react'

function VideoBlock({ children, config }) {

  const _getIframe = (config) => {
    return {
      src: config.src,
      frameBorder: 0,
      allowFullScreen: true,
      allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
    }
  }

  return (
    <div className="maha-video">
      <div className="maha-video-frame">
        <iframe { ..._getIframe(config) } />
      </div>
      <div className="maha-video-caption" style={ Style(null, config.caption_style) }>
        { RichText(config.caption, config.caption_style) }
      </div>
    </div>
  )
}

export default VideoBlock
