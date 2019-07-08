import PropTypes from 'prop-types'
import React from 'react'
import Assign from './assign'

class AssignmentField extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    assignments: PropTypes.array,
    status: PropTypes.string,
    unassgined: PropTypes.array,
    onFetch: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
  }

  _handleAssign = this._handleAssign.bind(this)

  render() {
    const { assignments, status } = this.props
    if(status !== 'ready') return null
    return (
      <div className="assignmentfield" onClick={ this._handleAssign }>
        { assignments.map((assignment, index) => (
          <div className="assignmentfield-token" key={`assignment_${index}`}>
            { assignment.user && assignment.user.full_name }
            { assignment.group && assignment.group.title }
            { assignment.is_everyone && <span>Everyone</span> }
          </div>
        )) }
      </div>
    )
  }

  componentDidMount() {
    this.props.onFetch()
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props
    if(status !== prevProps.status) {
      if(status === 'ready') this.props.onReady()
    }
  }

  _handleAssign() {
    this.context.form.push(<Assign />)
  }

}

export default AssignmentField
