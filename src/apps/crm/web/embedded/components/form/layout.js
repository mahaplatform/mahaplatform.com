import PropTypes from 'prop-types'
import React from 'react'

class Layout extends React.Component {

  static propTypes = {
    config: PropTypes.object,
    children: PropTypes.any
  }

  render() {
    const { config } = this.props
    return (
      <div className="maha-form-layout">
        { config.page.cover_image &&
          <div className="maha-form-layout-image" />
        }
        <div className="maha-form-layout-content">
          { this.props.children }
        </div>
      </div>
    )
  }

}

export default Layout
