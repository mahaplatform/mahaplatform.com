import PropTypes from 'prop-types'
import React from 'react'

class Question extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {}

  static defaultProps = {}

  render() {
    return (
      <div className="flowchart-box-padding">
        <div className="flowchart-box hangup">
          <div className="flowchart-box-icon">
            <i className="fa fa-phone"></i>
          </div>
          hangup
        </div>
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}


}

export default Question
