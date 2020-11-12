import React from 'react'

function VideoBlock({ children, config }) {
  return (
    <div>
      <div>
        video
      </div>
      <div dangerouslySetInnerHTML={{ __html: config.caption }} />
    </div>
  )
}

export default VideoBlock
