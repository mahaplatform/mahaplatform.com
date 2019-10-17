import PropTypes from 'prop-types'
import React from 'react'

class Hangup extends React.PureComponent {

  render() {
    return (
      <div className="flowchart-box-padding">
        <div className="flowchart-box flowchart-box-ending">
          <div className="flowchart-box-icon">
            <i className="fa fa-phone" />
          </div>
          <div className="flowchart-box-label">
            hangup
          </div>
        </div>
      </div>
    )
  }

}

export default Hangup
