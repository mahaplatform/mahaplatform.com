import PropTypes from 'prop-types'
import Assign from './assign'
import React from 'react'
import _ from 'lodash'

class AssignmentField extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    assigned: PropTypes.array,
    assignments: PropTypes.array,
    cid: PropTypes.string,
    q: PropTypes.string,
    status: PropTypes.string,
    unassigned: PropTypes.array,
    onAdd: PropTypes.func,
    onChange: PropTypes.func,
    onFetch: PropTypes.func,
    onQuery: PropTypes.func,
    onReady: PropTypes.func,
    onRemove: PropTypes.func
  }

  static defaultProps = {
  }

  _handleAssign = this._handleAssign.bind(this)

  render() {
    const { assigned, status } = this.props
    if(status !== 'ready') return null
    return (
      <div className="assignmentfield" onClick={ this._handleAssign }>
        { assigned.map((assignee, index) => (
          <div className="assignmentfield-token" key={`assignment_${index}`}>
            { assignee.user && assignee.user.full_name }
            { assignee.group && assignee.group.title }
            { assignee.is_everyone && <span>Everyone</span> }
          </div>
        )) }
      </div>
    )
  }

  componentDidMount() {
    this.props.onFetch()
  }

  componentDidUpdate(prevProps) {
    const { status, assignments } = this.props
    if(status !== prevProps.status) {
      if(status === 'ready') this.props.onReady()
    }
    if(!_.isEqual(assignments, prevProps.assignments)) {
      this.props.onChange(assignments)
    }
  }

  _getAssign() {
    const { cid, onAdd, onQuery, onRemove } = this.props
    return {
      cid,
      onAdd,
      onQuery,
      onRemove
    }
  }

  _getAssign() {
    const { assignments, unassigned } = this.props
    return {
      assignments,
      unassigned
    }
  }

  _handleAssign() {
    this.context.form.push(<Assign { ...this._getAssign() } />)
  }

}

export default AssignmentField
