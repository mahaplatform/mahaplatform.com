import PropTypes from 'prop-types'
import React from 'react'

class Sidebar extends React.Component {

  static propTypes = {
    sidebar: PropTypes.func
  }

  static contextTypes = {
    logger: PropTypes.object
  }

  render() {
    return (
      <div className="maha-portal-sidebar">
        <this.props.sidebar />
      </div>
    )
  }

  componentDidCatch(error, info) {
    this.context.logger.error(error, info)
  }

}

export default Sidebar
