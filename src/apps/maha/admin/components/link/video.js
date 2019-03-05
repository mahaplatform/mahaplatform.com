import React from 'react'
import PropTypes from 'prop-types'

class Video extends React.Component {

  state = {
    active: false
  }

  static propTypes = {
    video_url: PropTypes.string,
    image_url: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    service_icon: PropTypes.string,
    service_name: PropTypes.string
  }

  _handleClick = this._handleClick.bind(this)

  render() {
    const { image_url, title, text, service_name, service_icon } = this.props
    const { active } = this.state
    return (
      <div className="maha-link-video">
        { active ?
          <div className="maha-link-video-player">
            <iframe src={ this._getAutoplayUrl() } frameBorder="0" gesture="media" allowFullScreen></iframe>
          </div> :
          <div className="maha-link-video-image" onClick={ this._handleClick }>
            <img src={ image_url} />
            { service_name === 'www.youtube.com' && <div className="maha-link-video-play" /> }
          </div>
        }
        <div className="maha-link-details">
          <div className="maha-link-title">
            { title }
          </div>
          { text &&
            <div className="maha-link-text">
              { text }
            </div>
          }
          <div className="maha-link-service">
            { service_icon && <img src={ service_icon } />}
            { service_name }
          </div>
        </div>
      </div>
    )
  }

  _getAutoplayUrl() {
    const { video_url } = this.props
    const [,path,query] = video_url.match(/([^?]*)\??(.*)?/)
    const newquery = [
      ...(query || '').split('&'),
      'autoplay=1'
    ]
    return `${path}?${newquery.join('&')}`
  }

  _handleClick() {
    this.setState({ active: true })
  }

}

export default Video
