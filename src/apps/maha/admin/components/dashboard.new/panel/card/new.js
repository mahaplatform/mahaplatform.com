import PropTypes from 'prop-types'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    panel: PropTypes.object
  }

  render() {
    return <div>new</div>
  }

}

export default New
