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
    const { config } = this.props
    if(!config.profile) return null
    const Component = this._getComponent()
    return (
      <div className="social-designer-post">
        <Component { ...this._getSocial() } />
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  _getComponent() {
    const { config } = this.props
    const { profile } = config
    if(profile.service === 'facebook') return Facebook
    if(profile.service === 'instagram') return Instagram
    if(profile.service === 'twitter') return Twitter
  }

  _getSocial() {
    const { config } = this.props
    return {
      config
    }
  }

}

export default Canvas
