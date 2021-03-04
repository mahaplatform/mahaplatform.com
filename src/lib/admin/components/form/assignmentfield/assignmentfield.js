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
    defaultValue: PropTypes.array,
    placeholder: PropTypes.string,
    prompt: PropTypes.string,
    q: PropTypes.string,
    status: PropTypes.string,
    unassigned: PropTypes.array,
    onAdd: PropTypes.func,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    onFetch: PropTypes.func,
    onQuery: PropTypes.func,
    onReady: PropTypes.func,
    onRemove: PropTypes.func,
    onSet: PropTypes.func
  }

  static defaultProps = {
    prompt: 'Assign Access'
  }

  _handleAssign = this._handleAssign.bind(this)
  _handleClear = this._handleClear.bind(this)

  render() {
    const { assigned, placeholder, prompt, status } = this.props
    if(status !== 'ready') return null
    return (
      <div className="assignmentfield" onClick={ this._handleAssign }>
        <div className="assignmentfield-field">
          { assigned.map((assignee, index) => (
            <div className="assignmentfield-token" key={`assignment_${index}`}>
              { assignee.full_name }
            </div>
          )) }
          { assigned.length === 0 &&
            <div className="assignmentfield-prompt">
              { placeholder || prompt }
            </div>
          }
        </div>
        { assigned.length > 0 &&
          <div className="assignmentfield-clear" onClick={ this._handleClear }>
            <i className="fa fa-times" />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onFetch, onSet } = this.props
    onFetch()
    if(defaultValue) onSet(defaultValue)
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

  _handleAssign() {
    this.context.form.push(Assign, this._getAssign.bind(this))
  }

  _handleClear(e) {
    e.stopPropagation()
    this.props.onClear()
  }

}

export default AssignmentField
