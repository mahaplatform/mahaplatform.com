import PropTypes from 'prop-types'
import React from 'react'

class Twitter extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object
  }

  render() {
    const { config } = this.props
    const { profile, message, photos, link } = config
    return (
      <div className="social-designer-twitter">
        <div className="social-designer-twitter-header">
          <div className="social-designer-twitter-logo">
            <img src={`/imagecache/w=48${ profile.photo }`} alt={ profile.username } />
          </div>
          <div className="social-designer-twitter-details">
            <span className="social-designer-twitter-name">
              { profile.name }
            </span>
            <span className="social-designer-twitter-username">
              @{ profile.username }
            </span>
            <span className="social-designer-twitter-timestamp">
              • Now
            </span>
            { message &&
              <div className="social-designer-twitter-message">
                { message }
              </div>
            }
          </div>
        </div>
        { photos && photos.length > 0 &&
          <div className="social-designer-twitter-photo">
            { photos.map((photo, index) => (
              <img src={`/imagecache/cover=fit&w=1024&h=512${photo.path}`} key={`photo_${index}`} />
            )) }
          </div>
        }
      </div>
    )
  }

}

export default Twitter
