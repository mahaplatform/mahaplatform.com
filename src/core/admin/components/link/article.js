import PropTypes from 'prop-types'
import React from 'react'

class Article extends React.Component {

  static propTypes = {
    active: PropTypes.bool,
    image_url: PropTypes.string,
    service_icon: PropTypes.string,
    service_name: PropTypes.string,
    text: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string
  }

  static defaultProps = {
    active: true
  }

  link = null

  _handleClick = this._handleClick.bind(this)

  render() {
    const { image_url, title, text, service_icon, service_name, url } = this.props
    return (
      <div { ...this._getLink() }>
        { image_url &&
          <div className="maha-link-article-image">
            <img src={ image_url } />
          </div>
        }
        <div className="maha-link-details">
          <div className="maha-link-title">
            { title }
          </div>
          <div className="maha-link-text">
            { text }
          </div>
          <div className="maha-link-service">
            { service_icon && <img src={ service_icon } />}
            { service_name }
          </div>
        </div>
        <a href={ url } rel="noopener noreferrer" target="_blank" ref={ node => this.link = node } />
      </div>
    )
  }

  _getLink() {
    return {
      className: 'maha-link-article',
      onClick: this._handleClick
    }
  }

  _handleClick() {
    const { active } = this.props
    if(!active) return
    this.link.click()
  }

}


export default Article
