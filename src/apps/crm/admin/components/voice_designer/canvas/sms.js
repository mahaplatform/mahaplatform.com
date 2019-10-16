import PropTypes from 'prop-types'
import React from 'react'

class SMS extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    action: PropTypes.string
  }

  static defaultProps = {}

  render() {
    return (
      <div className="flowchart-box-padding">
        <div className="flowchart-box flowchart-box-sms">
          <div className="flowchart-box-icon">
            <i className="fa fa-comment" />
          </div>
          <div className="flowchart-box-label">
            Send SMS
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}


}

export default SMS
