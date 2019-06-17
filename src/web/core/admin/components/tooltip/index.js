import PropTypes from 'prop-types'
import React from 'react'

class Tooltip extends React.Component {

  static propTypes = {
    label: PropTypes.string
  }

  render() {
    const { label } = this.props
    return <div className="maha-tooltip-bubble">{ label }</div>
  }

}


export default Tooltip
