import PropTypes from 'prop-types'
import React from 'react'

class Closed extends React.Component {

  static propTypes = {
    config: PropTypes.object
  }

  render() {
    const { config } = this.props
    const { message } = config.limits
    return (
      <div className="maha-form-body">
        <div className="maha-form-closed" dangerouslySetInnerHTML={{ __html: message }} />
      </div>
    )
  }

}

export default Closed
