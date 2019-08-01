import PropTypes from 'prop-types'
import React from 'react'

class Call extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    activity: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { activity } = this.props
    return (
      <div className="crm-timeline-item-card-call">
        { activity.data.text }
      </div>
    )
  }

}

export default Call
