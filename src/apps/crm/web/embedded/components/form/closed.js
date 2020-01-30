import PropTypes from 'prop-types'
import React from 'react'

class Closed extends React.Component {

  static propTypes = {
    config: PropTypes.object
  }

  render() {
    const { config } = this.props
    const { closed_message } = config.settings
    return <div className="maha-form-closed" dangerouslySetInnerHTML={{ __html: closed_message }} />
  }

}

export default Closed
