import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class Facebook extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    config: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { config } = this.props
    const service = config.services[0]
    return (
      <div className="social-designer-facebook">
        <div className="social-designer-facebook-header">
          <div className="social-designer-facebook-logo">
            <img src={ service.logo } alt={ service.username } />
          </div>
          <div className="social-designer-facebook-details">
            <div className="social-designer-facebook-username">
              { service.username }
            </div>
            <div className="social-designer-facebook-timestamp">
              { moment(service.timestamp).format('MMMM d [at] h:mm A') } •
              <img src="/images/public.png" />
            </div>
          </div>
        </div>
        { service.message &&
          <div className="social-designer-facebook-message">
            { service.message }
          </div>
        }
        { service.photos.length > 0 &&
          <div className="social-designer-facebook-body">
            { service.photos.map((photo, index) => (
              <img src={ photo } key={`photo_${index}`} />
            )) }
          </div>
        }
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

}

export default Facebook
