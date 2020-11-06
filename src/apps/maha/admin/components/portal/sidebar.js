import { Error } from '@admin'
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
        <Error>
          <this.props.sidebar />
        </Error>
      </div>
    )
  }

}

export default Sidebar
