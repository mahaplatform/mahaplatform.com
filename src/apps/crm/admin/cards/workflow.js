import PropTypes from 'prop-types'
import React from 'react'

class Workflow extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    activity: PropTypes.object
  }

  static defaultProps = {}

  render() {
    return (
      <div className="crm-workflow-card">
        <ol>
          <li>Listened to speaking</li>
          <li>Pressed 1</li>
          <li>Listened to speaking</li>
          <li>Acheived goal</li>
          <li>Call hung up</li>
        </ol>
      </div>
    )
  }

}

export default Workflow
