import React from 'react'
import Article from './article'
import Video from './video'

const Link = ({ link }) => (
  <div className="maha-link">
    { link.video_url && <Video { ...link } /> }
    { !link.video_url && link.image_url && <Article { ...link } /> }
  </div>
)

export default Link
