import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class twitter extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    config: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { config } = this.props
    const service = config.services[2]
    return (
      <div className="social-designer-twitter">
        <div className="social-designer-twitter-header">
          <div className="social-designer-twitter-logo">
            <img src={ service.logo } alt={ service.username } />
          </div>
          <div className="social-designer-twitter-details">
            <span className="social-designer-twitter-name">
              { service.name }
            </span>
            <span className="social-designer-twitter-username">
              { service.username }
            </span>
            <span className="social-designer-twitter-timestamp">
              • Now
            </span>
            { service.message &&
              <div className="social-designer-twitter-message">
                { service.message }
              </div>
            }
          </div>
        </div>
        { service.photos.length > 0 &&
          <div className="social-designer-twitter-photo">
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

export default twitter
