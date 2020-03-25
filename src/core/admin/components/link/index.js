import PropTypes from 'prop-types'
import Article from './article'
import Video from './video'
import React from 'react'

const Link = ({ link, active }) => (
  <div className="maha-link">
    { link.video_url ?
      <Video { ...link } active={ active } /> :
      <Article { ...link } active={ active } />
    }
  </div>
)

Link.propTypes = {
  active: PropTypes.bool,
  link: PropTypes.object
}

export default Link
