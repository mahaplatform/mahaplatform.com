import PropTypes from 'prop-types'
import React from 'react'

class Header extends React.Component {

  static propTypes = {
    config: PropTypes.object
  }

  render() {
    const { config } = this.props
    const { image, text } = config.header
    return (
      <div className="maha-form-header">
        { image &&
          <div className="maha-form-header-image">
            <img src={`/imagecache/w=770/${image}`} />
          </div>
        }
        { text &&
          <div className="maha-form-footer-text" dangerouslySetInnerHTML={{ __html: text }} />
        }
      </div>
    )
  }

}

export default Header
