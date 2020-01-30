import PropTypes from 'prop-types'
import React from 'react'

class Confirmation extends React.Component {

  static propTypes = {
    config: PropTypes.object
  }

  render() {
    const { config } = this.props
    const { confirmation_message } = config.settings
    return <div className="maha-form-confirmation" dangerouslySetInnerHTML={{ __html: confirmation_message }} />
  }

}

export default Confirmation
