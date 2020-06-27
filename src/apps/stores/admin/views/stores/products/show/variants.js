import PropTypes from 'prop-types'
import React from 'react'

class Variants extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    products: PropTypes.array,
    store: PropTypes.object
  }

  render() {
    return (
      <div>Variants</div>
    )
  }


}

export default Variants
