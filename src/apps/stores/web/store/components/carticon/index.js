import PropTypes from 'prop-types'

import React from 'react'

class Store extends React.Component {

  static propTypes = {
    config: PropTypes.object
  }

  render() {
    return (
      <div className="store-carticon">
        <i className="fa fa-shopping-cart" />
        <span className="store-carticon-count">5</span>
      </div>
    )
  }

}

export default Store
