import PropTypes from 'prop-types'
import React from 'react'

class Twitter extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object
  }

  render() {
    const { config } = this.props
    const profile = config.profile
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
            { profile.message &&
              <div className="social-designer-twitter-message">
                { profile.message }
              </div>
            }
          </div>
        </div>
        { profile.photos.length > 0 &&
          <div className="social-designer-twitter-photo">
            { profile.photos.map((photo, index) => (
              <img src={ photo } key={`photo_${index}`} />
            )) }
          </div>
        }
      </div>
    )
  }

}

export default Twitter
