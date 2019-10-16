import PropTypes from 'prop-types'
import React from 'react'

class Hangup extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {}

  static defaultProps = {}

  render() {
    return (
      <div className="flowchart-box-padding">
        <div className="flowchart-box flowchart-box-hangup">
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

  componentDidMount() {}

  componentDidUpdate(prevProps) {}


}

export default Hangup
