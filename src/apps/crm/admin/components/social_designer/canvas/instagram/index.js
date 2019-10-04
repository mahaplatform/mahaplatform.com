import PropTypes from 'prop-types'
import React from 'react'

class Instagram extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    config: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { config } = this.props
    const service = config.services[1]
    return (
      <div className="social-designer-instagram">
        <div className="social-designer-instagram-header">
          <div className="social-designer-instagram-logo">
            <img src={ service.logo } alt={ service.username } />
          </div>
          <div className="social-designer-instagram-details">
            <div className="social-designer-instagram-username">
              { service.username }
            </div>
          </div>
        </div>
        { service.photo &&
          <div className="social-designer-instagram-body">
            <img src={ service.photo } />
          </div>
        }
        { service.message &&
          <div className="social-designer-instagram-message">
            <strong>{ service.username }</strong> { service.message }
          </div>
        }
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

}

export default Instagram
