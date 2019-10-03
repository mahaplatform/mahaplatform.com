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
    const { description } = activity.data
    return (
      <div className="crm-timeline-item-card-call">
        { description.split('\n').map((line, index) => (
          <span key={`line_${index}`}>{ line }<br /></span>
        )) }
      </div>
    )
  }

}

export default Call
