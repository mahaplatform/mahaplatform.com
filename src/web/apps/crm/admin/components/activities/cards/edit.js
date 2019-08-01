import PropTypes from 'prop-types'
import React from 'react'

class Edit extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    activity: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { activity } = this.props
    return (
      <div className="crm-timeline-item-card-edit">
        added phone: (234) 567-8901<br />
        edited email: janedoe@cornell.edu &rarr; janedoe@gmail.com
      </div>
    )
  }

}

export default Edit
