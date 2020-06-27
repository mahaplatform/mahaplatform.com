import PropTypes from 'prop-types'
import React from 'react'

class Performance extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    products: PropTypes.array,
    store: PropTypes.object
  }

  render() {
    return (
      <div>Performance</div>
    )
  }


}

export default Performance
