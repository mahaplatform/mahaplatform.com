import { Loader, ModalPanel, AssigneeToken } from 'maha-admin'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import AccessTypeToken from '../access_type_token'
import Unassigned from './unassigned'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Access extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    adding: PropTypes.bool,
    assigned: PropTypes.object,
    item: PropTypes.object,
    q: PropTypes.string,
    unassigned: PropTypes.object,
    onAdd: PropTypes.func,
    onBeginAdd: PropTypes.func,
    onFetchAssigned: PropTypes.func,
    onFetchUnassigned: PropTypes.func,
    onQuery: PropTypes.func,
    onRevoke: PropTypes.func,
    onRemove: PropTypes.func,
    onSave: PropTypes.func,
    onUpdate: PropTypes.func
  }

  list = null

  _handleAdd = this._handleAdd.bind(this)
  _handleBeginAdd = this._handleBeginAdd.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleSave = this._handleSave.bind(this)

  render() {
    const { assigned } = this.props
    return (
      <ModalPanel { ...this._getModalPanel() } >
        <div className={ this._getClass() }>
          <div className="maha-assignment-body">
            { assigned.status === 'loading' && <Loader /> }
            { !_.includes(['pending','loading'], assigned.status) &&
              <div className="maha-assignment-assigned">
                <div className="maha-assignment-add" onClick={ this._handleBeginAdd }>
                  Assign a group or user...
                </div>
                <div className="maha-assignment-list" ref={ node => this.list = node}>
                  <TransitionGroup>
                    { assigned.records.map((assignment, index) => (
                      <CSSTransition classNames="expanded" timeout={ 1000 } exit={ false } key={`assigned_${index}`}>
                        <div className={ this._getAssignmentClass(assignment) }>
                          <div className="maha-assignment-item-token">
                            <AssigneeToken { ...assignment } />
                          </div>
                          <AccessTypeToken { ...this._getAccessType(assignment, index) } />
                          { assignment.access_type_id === 1 && <div className="maha-assignment-item-icon" /> }
                          { assignment.access_type_id !== 1 &&
                            <div className="maha-assignment-item-icon" onClick={ this._handleRemove.bind(this, index) }>
                              { assignment.is_revoked ? <i className="fa fa-fw fa-refresh" /> : <i className="fa fa-fw fa-times" /> }
                            </div>
                          }
                        </div>
                      </CSSTransition>
                    ))}
                  </TransitionGroup>
                </div>
              </div>
            }
            <Unassigned { ...this._getUnassigned() } />
          </div>
          <div className="maha-assignment-footer">
            <strong>NOTE:</strong> Any changes you make to the access for this
            folder will be applied to the files and folders beneath it
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { item, onFetchUnassigned, onFetchAssigned } = this.props
    onFetchUnassigned()
    onFetchAssigned(item.code)
  }

  componentDidUpdate(prevProps) {
    const { assigned } = this.props
    const { modal } = this.context
    if(assigned.records.length > prevProps.assigned.records.length) {
      this.list.scrollTop = this.list.scrollHeight
    }
    if(assigned.status !== prevProps.assigned.status && assigned.status === 'saved') {
      modal.close()
    }
  }

  _getModalPanel() {
    return {
      title: 'Manage Access',
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ],
      rightItems: [
        { label: 'Save', handler: this._handleSave }
      ]
    }
  }

  _getClass() {
    const { adding } = this.props
    const classes = ['maha-assignment']
    if(adding) classes.push('adding')
    return classes.join(' ')
  }

  _getAssignmentClass(assignment) {
    const classes = ['maha-assignment-item']
    if(assignment.is_revoked) classes.push('disabled')
    return classes.join(' ')
  }

  _getEmpty() {
    return {
      icon: 'times',
      title: '',
      text: ''
    }
  }

  _getNotFound() {
    return {
      icon: 'times',
      title: 'No Results Found',
      text: 'No records matched your query'
    }
  }

  _getUnassigned() {
    const { unassigned, onQuery } = this.props
    return {
      unassigned,
      onChoose: this._handleAdd,
      onQuery
    }
  }

  _getAccessType(assignment, index) {
    return {
      ...assignment,
      onUpdate: this._handleUpdate.bind(this, index)
    }
  }

  _handleAdd(assignment) {
    this.props.onAdd({
      ...assignment,
      access_type_id: 3,
      is_revoked: false
    })
  }

  _handleBeginAdd() {
    this.props.onBeginAdd()

  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleRemove(index) {
    const { assigned, onRemove, onRevoke } = this.props
    console.log(index, assigned.records)
    const assignment = assigned.records[index]
    if(!assignment.id) return onRemove(index)
    return onRevoke(index)
  }

  _handleSave() {
    const { assigned, item, onSave } = this.props
    const access = assigned.records.map(assignee => ({
      grouping: assignee.grouping,
      group_id: assignee.group_id,
      user_id: assignee.user_id,
      access_type_id: !assignee.is_revoked ? assignee.access_type_id : null
    }))
    onSave(item.code, access)
  }

  _handleUpdate(index, access_type_id) {
    this.props.onUpdate(index, access_type_id)
  }

}

export default Access
