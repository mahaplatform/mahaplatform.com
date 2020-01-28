import PropTypes from 'prop-types'
import React from 'react'

class Form extends React.PureComponent {

  static propTypes = {
    activity: PropTypes.object,
    program: PropTypes.object
  }

  render() {
    const { activity } = this.props
    const { program } = activity
    return (
      <div className="crm-timeline-item-form-note">
        <strong>Program:</strong> { program.title }<br />
      </div>
    )
  }

}

export default Form
