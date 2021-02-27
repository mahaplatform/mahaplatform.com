import PropTypes from 'prop-types'
import React from 'react'

class Responses extends React.PureComponent {

  static contextTypes = {
  }

  static propTypes = {
    dataset: PropTypes.object,
    type: PropTypes.object
  }

  render() {
    return (
      <div className="datasets-manager-container">
        <div className="datasets-manager-panel">
          Responses
        </div>
      </div>
    )
  }

}

export default Responses
