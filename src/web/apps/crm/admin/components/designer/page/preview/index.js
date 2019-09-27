import PropTypes from 'prop-types'
import Device from './device'
import Email from './email'
import React from 'react'

class Preview extends React.Component {

  static propTypes = {
    config: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onUpdate: PropTypes.func
  }

  render() {
    return (
      <div className="designer-preview">
        Email Preview
      </div>
    )
  }

}

export default Preview
