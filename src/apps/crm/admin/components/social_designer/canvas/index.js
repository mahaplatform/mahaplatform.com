import PropTypes from 'prop-types'
import Instagram from './instagram'
import Facebook from './facebook'
import Twitter from './twitter'
import React from 'react'

class Canvas extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    config: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const Component = this._getComponent()
    return (
      <div className="social-designer-canvas">
        <div className="social-designer-post">
          <Component { ...this._getSocial() } />
        </div>
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  _getComponent() {
    const { config } = this.props
    const { services } = config
    const service = services[0]
    if(service.service === 'facebook') return Facebook
    if(service.service === 'instagram') return Instagram
    if(service.service === 'twitter') return Twitter
  }

  _getSocial() {
    const { config } = this.props
    return {
      config
    }
  }

}

export default Canvas
