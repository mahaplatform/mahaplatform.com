import PropTypes from 'prop-types'
import React from 'react'

class Call extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    activity: PropTypes.object,
    program: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { activity } = this.props
    const { data, program } = activity
    const { description } = data
    return (
      <div className="crm-timeline-item-card-call">
        <strong>Program:</strong> { program.title }<br />
        { description.split('\n').map((line, index) => (
          <span key={`line_${index}`}>{ line }<br /></span>
        )) }
      </div>
    )
  }

}

export default Call
