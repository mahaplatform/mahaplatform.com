import PropTypes from 'prop-types'
import React from 'react'

class Workflow extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    action: PropTypes.string
  }

  static defaultProps = {}

  render() {
    const { action } = this.props
    return (
      <div className="flowchart-box-padding">
        <div className="flowchart-box flowchart-box-workflow">
          <div className="flowchart-box-icon">
            <i className="fa fa-gears" />
          </div>
          <div className="flowchart-box-label">
            { action === 'enroll' ? 'enroll in workflow' : 'remove from workflow' }
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}


}

export default Workflow
