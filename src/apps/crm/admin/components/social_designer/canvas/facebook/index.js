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
              { moment().format('MMMM dd [at] h:mm A') } •
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
            <div className="social-designer-facebook-link-image">
              <img src={ link.image_url } />
            </div>
            <div className="social-designer-facebook-link-details">
              <div className="social-designer-facebook-link-source">
                { link.service_name }<br />
              </div>
              <div className="social-designer-facebook-link-title">
                { link.title }
              </div>
            </div>
          </div>
        }
        { photos && photos.length > 0 &&
          <div className={`social-designer-facebook-photos photos-${photos.length}`}>
            { photos.map((photo, index) => (
              <div className="social-designer-facebook-photo" key={`photo_${index}`}>
                <img src={`/imagecache/cover=fit&w=1024&h=512${photo.path}`} />
              </div>
            )) }
          </div>
        }
      </div>
    )
  }

}

export default Facebook
