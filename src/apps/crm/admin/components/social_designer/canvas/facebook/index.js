import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class Facebook extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object
  }

  render() {
    const { config } = this.props
    const { profile, message, photos, link } = config
    return (
      <div className="social-designer-facebook">
        <div className="social-designer-facebook-header">
          <div className="social-designer-facebook-logo">
            <img src={`/imagecache/w=40${ profile.photo }`} alt={ profile.username } />
          </div>
          <div className="social-designer-facebook-details">
            <div className="social-designer-facebook-username">
              { profile.username }
            </div>
            <div className="social-designer-facebook-timestamp">
              { moment(profile.timestamp).format('MMMM d [at] h:mm A') } •
              <img src="/images/public.png" />
            </div>
          </div>
        </div>
        { message &&
          <div className="social-designer-facebook-message">
            { message }
          </div>
        }
        { link &&
          <div className="social-designer-facebook-link">
            { link }
          </div>
        }
        { photos && photos.length > 0 &&
          <div className="social-designer-facebook-body">
            { photos.map((photo, index) => (
              <img src={ photo.signed_url } key={`photo_${index}`} />
            )) }
          </div>
        }
      </div>
    )
  }

}

export default Facebook
