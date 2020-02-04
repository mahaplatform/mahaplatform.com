import PropTypes from 'prop-types'
import React from 'react'

class Confirmation extends React.Component {

  static propTypes = {
    config: PropTypes.object
  }

  render() {
    const { config } = this.props
    const { message } = config.confirmation
    return (
      <div className="maha-form-body">
        <div className="maha-form-confirmation" dangerouslySetInnerHTML={{ __html: message }} />
      </div>
    )
  }

}

export default Confirmation
