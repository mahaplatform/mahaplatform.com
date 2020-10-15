import PropTypes from 'prop-types'
import CartIcon from '../carticon'
import Catalog from '../catalog'

import React from 'react'

class Store extends React.Component {

  static propTypes = {
    config: PropTypes.object
  }

  render() {
    return (
      <div className="store">
        <div className="store-header">
          <div className="store-header-title">
            2020 Annual Bulb Sale
          </div>
          <div className="store-header-action">
            <CartIcon />
          </div>
        </div>
        <div className="store-body">
          <Catalog />
        </div>
      </div>
    )
  }

}

export default Store
