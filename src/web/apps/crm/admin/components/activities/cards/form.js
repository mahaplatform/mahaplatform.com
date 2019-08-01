import PropTypes from 'prop-types'
import React from 'react'

class Note extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    activity: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { activity } = this.props
    return (
      <div className="crm-timeline-item-card-form">
        { activity.data.map((answer, index) => (
          <div className="form-answer" key={`answer_${index}`}>
            <strong>{ answer.label }:</strong> { answer.value }
          </div>
        ))}
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

}

export default Note
