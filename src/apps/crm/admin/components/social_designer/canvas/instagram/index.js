import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class Instagram extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object
  }

  render() {
    const { config } = this.props
    const { profile, message, photos } = config
    return (
      <div className="social-designer-instagram">
        <div className="social-designer-instagram-header">
          <div className="social-designer-instagram-logo">
            <img src={`/imagecache/w=40${ profile.photo }`} alt={ profile.username } />
          </div>
          <div className="social-designer-instagram-details">
            <div className="social-designer-instagram-username">
              { profile.username }
            </div>
          </div>
        </div>
        <div className="social-designer-instagram-body">
          { photos && photos.map((photo, index) => (
            <img src={`/imagecache/cover=fit&w=1024&h=512${photo.path}`} key={`photo_${index}`} />
          )) }
        </div>
        <div className="social-designer-instagram-footer">
          <div className="social-designer-instagram-message">
            <strong>{ profile.username }</strong> { message }
          </div>
          <div className="social-designer-instagram-timestamp">
            <time>{ moment().fromNow() }</time>
          </div>
        </div>
      </div>
    )
  }

}

export default Instagram
