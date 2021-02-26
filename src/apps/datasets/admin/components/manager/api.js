import PropTypes from 'prop-types'
import React from 'react'

class API extends React.PureComponent {

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
          https://mahaplatform.com/datasets/abvdef/types/abcdef
        </div>
      </div>
    )
  }

}

export default API
