import PropTypes from 'prop-types'
import React from 'react'

class Header extends React.Component {

  static propTypes = {
    image: PropTypes.string,
    text: PropTypes.string
  }

  render() {
    const { image, text } = this.props
    return (
      <div className="maha-form-header">
        { image &&
          <div className="maha-form-header-image">
            <img src={ image } />
          </div>
        }
        { text &&
          <div className="maha-form-header-text" dangerouslySetInnerHTML={{ __html: text }} />
        }
      </div>
    )
  }

}

export default Header
