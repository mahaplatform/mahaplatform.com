import PropTypes from 'prop-types'
import React from 'react'

class Email extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    action: PropTypes.string
  }

  static defaultProps = {}

  render() {
    return (
      <div className="flowchart-box-padding">
        <div className="flowchart-box flowchart-box-email">
          <div className="flowchart-box-icon">
            <i className="fa fa-envelope" />
          </div>
          <div className="flowchart-box-label">
            Send Email
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}


}

export default Email
