import PropTypes from 'prop-types'
import React from 'react'

class Device extends React.Component {

  static propTypes = {
    config: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onUpdate: PropTypes.func
  }

  render() {
    return (
      <div className="designer-page-sections">
        Preview via Email
      </div>
    )
  }

}

export default Device
