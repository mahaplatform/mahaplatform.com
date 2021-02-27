import PropTypes from 'prop-types'
import React from 'react'

class Forms extends React.PureComponent {

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
          forms
        </div>
      </div>
    )
  }

}

export default Forms
