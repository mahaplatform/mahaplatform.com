import PropTypes from 'prop-types'
import React from 'react'

class Header extends React.Component {

  static propTypes = {
    config: PropTypes.object
  }

  render() {
    const { config } = this.props
    const { image } = config.header
    return (
      <div className="maha-form-header">
        { image &&
          <div className="maha-form-header-image">
            <img src={`/imagecache/w=770/${image}`} />
          </div>
        }
      </div>
    )
  }

}

export default Header
