import PropTypes from 'prop-types'
import React from 'react'

class Instagram extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object
  }

  render() {
    const { config } = this.props
    const profile = config.profile
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
        { profile.photo &&
          <div className="social-designer-instagram-body">
            <img src={ profile.photo } />
          </div>
        }
        { profile.message &&
          <div className="social-designer-instagram-message">
            <strong>{ profile.username }</strong> { profile.message }
          </div>
        }
      </div>
    )
  }

}

export default Instagram
