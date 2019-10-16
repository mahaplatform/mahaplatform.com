import PropTypes from 'prop-types'
import React from 'react'

class Goal extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {}

  static defaultProps = {}

  render() {
    return (
      <div className="flowchart-box-padding">
        <div className="flowchart-box flowchart-box-goal">
          <div className="flowchart-box-icon">
            <i className="fa fa-flag" />
          </div>
          <div className="flowchart-box-label">
            goal
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}


}

export default Goal
