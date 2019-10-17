import PropTypes from 'prop-types'
import React from 'react'

class Beginning extends React.PureComponent {

  render() {
    return (
      <div className="flowchart-box-padding">
        <div className="flowchart-box flowchart-box-beginning">
          <div className="flowchart-box-icon">
            <i className="fa fa-phone" />
          </div>
          <div className="flowchart-box-label">
            incoming call
          </div>
        </div>
      </div>
    )
  }

}

export default Beginning
